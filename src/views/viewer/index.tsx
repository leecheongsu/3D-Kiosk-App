import React, { useEffect, useRef, useState } from 'react';
import { firestore } from '@lib/firebase';
import { useParams } from 'react-router';
import Loading from '@components/Loading';
import initialize from './initialize';
import Category from '@components/Category';
import { Categories } from '@src/types/category';

type Props = {};

function index({}: Props) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const { id } = useParams<{
    id: string;
  }>();
  const [modelUrl, setModelUrl] = useState<string>('');
  const [icons, setIcons] = useState([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isInitialized, setInitialized] = useState<boolean>(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function setInit() {
      try {
        const querySnapshot = await firestore().collection('intro_3d').where('title', '==', id).get();

        const url = querySnapshot.docs[0].data().modelUrl;
        setModelUrl(url);
        setLoading(false);

        const path = querySnapshot.docs[0].ref.path;

        const iconSnapshot = await firestore()
          .collection(path + '/icons')
          .get();

        //아이콘
        const icons = [];
        iconSnapshot.docs.forEach((doc) => {
          const inputData = {
            ...doc.data(),
            position: {
              x: doc.data().x,
              y: doc.data().y,
              z: doc.data().z,
            },
          };
          //리팩토링 할 것.
          icons.push(inputData);
        });
        setIcons(icons);

        //카테고리
        const categories = await firestore()
          .collection(path + '/category')
          .get()
          .then((data) => {
            return data.docs.map((v) => v.data() as Categories);
          });

        const linkWithCategories = categories.map((value) => {
          const isExist = icons.find((icon) => icon.label === value.title);
          if (isExist) {
            return {
              ...value,
              linkUrl: isExist.linkUrl,
            };
          }
          return value;
        });
        if (categories.length > 0) setCategories(linkWithCategories);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    setInit();
  }, []);

  useEffect(() => {
    if (isInitialized) return;
    if (canvas.current && modelUrl && icons.length > 0) {
      initialize(canvas.current, modelUrl, icons);
      setInitialized(true);
    }
  }, [canvas, modelUrl, icons]);

  return (
    <div>
      {isLoading ? (
        <Loading isLoading={isLoading} />
      ) : (
        <>
          {categories.length > 0 && <Category value={categories} />}
          <div style={{ width: '100%', height: '100%', position: 'absolute', right: 0 }}>
            <canvas
              ref={canvas}
              style={{
                width: '100vw',
                height: '100vh',
                backgroundColor: '#54DEFD',
                display: 'block',
                touchAction: 'none',
                cursor: 'inherit',
              }}
              id="canvas"
            />
          </div>
          x
        </>
      )}
    </div>
  );
}

export default index;

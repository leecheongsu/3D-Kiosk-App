import React, { useEffect, useRef, useState } from 'react';
import { firestore } from '@lib/firebase';
import Loading from '@components/Loading';
import initialize from './initialize';
import Category from '@components/Category';
import { Categories } from '@src/types/category';
import { makeStyles } from '@mui/styles';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useParams } from 'react-router';

type Props = {};

const useStyles = makeStyles({
  box: {
    position: 'absolute',
    top: 20,
    right: 100,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: '10px',
    zIndex: 100,
  },
});

function index({}: Props) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [modelUrl, setModelUrl] = useState('');
  const [icons, setIcons] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isInitialized, setInitialized] = useState(false);
  const [categories, setCategories] = useState([]);
  const [path, setPath] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('kor');
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();
  const [isShowLanguage, setIsShowLanguage] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const querySnapshot = await firestore().collection('intro_3d').where('title', '==', id).get();
        const modelUrl = querySnapshot.docs[0].data().modelUrl;
        const showLanguage = querySnapshot.docs[0].data().showLanguage;
        setModelUrl(modelUrl);
        setIsShowLanguage(showLanguage);
        setLoading(false);

        const path = querySnapshot.docs[0].ref.path;
        setPath(path);

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
      } catch (error) {
        console.error('fetchData : ' + error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    fetchCategoryData();
  }, [selectedLanguage, path]);

  async function fetchCategoryData() {
    try {
      const contentPath = `${path}/${selectedLanguage}`;
      const languageCategories = await firestore()
        .collection(contentPath)
        .get()
        .then((data) => {
          return data.docs.map((v) => v.data() as Categories);
        });

      const linkWithCategories = languageCategories.map((value) => {
        const isExist = icons.find((icon) => icon.label === value.title);
        if (isExist) {
          return {
            ...value,
            linkUrl: isExist.linkUrl,
          };
        }
        return value;
      });

      if (languageCategories.length > 0) setCategories(linkWithCategories);
    } catch (error) {
      console.error('fetchCategoryData :', error);
    }
  }

  useEffect(() => {
    if (isInitialized) return;
    if (canvas.current && modelUrl && icons.length > 0) {
      initialize(canvas.current, modelUrl, icons);
      setInitialized(true);
    }
  }, [canvas, modelUrl, icons]);

  const handleLanguageChange = (event: React.MouseEvent<HTMLElement>, newLanguage: string) => {
    if (newLanguage) {
      setSelectedLanguage(newLanguage);
    }
  };

  return (
    <div>
      {isLoading ? (
        <Loading isLoading={isLoading} />
      ) : (
        <>
          {isShowLanguage && (
            <div className={classes.box}>
              <ToggleButtonGroup
                exclusive
                fullWidth
                size="large"
                value={selectedLanguage}
                onChange={handleLanguageChange}
              >
                <ToggleButton value="kor">KO</ToggleButton>
                <ToggleButton value="eng">EN</ToggleButton>
              </ToggleButtonGroup>
            </div>
          )}
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
        </>
      )}
    </div>
  );
}

export default index;

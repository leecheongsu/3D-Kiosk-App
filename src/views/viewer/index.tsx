import React, { useEffect, useRef, useState } from 'react';
import initialize from './initialize';
import { firestore } from '@lib/firebase';
import { useParams } from 'react-router';
import Loading from '@components/Loading';

type Props = {};

function index({}: Props) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const { id } = useParams<{ id: string }>();
  const [modelUrl, setModelUrl] = useState<string>('');
  const [icons, setIcons] = useState([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isInitialized, setInitialized] = useState<boolean>(false);
  useEffect(() => {
    firestore()
      .collection('intro')
      .doc(id)
      .get()
      .then((doc) => {
        console.log(doc.data());
        setModelUrl(doc.data()?.modelUrl);
        // setTimeout(() => {
        setLoading(false);
        // }, 1000);
    });

    firestore()
      .collection('intro/'+id+'/icons')
      .get()
      .then((querySnapshot) => {
        const myArray = [];

        console.log(querySnapshot.size);

        querySnapshot.forEach(doc => {
          console.log('x:' + doc.data().x);
          myArray.push(doc.data());
        });

        setIcons(myArray);
    });

  }, []);
  useEffect(() => {
    if (isInitialized) return;
    if (canvas.current && modelUrl && icons.length > 0) {
      console.log('icons:' + icons.length);
      initialize(canvas.current, modelUrl, icons);
      setInitialized(true);
    }
  }, [canvas, modelUrl, icons]);
  <Loading isLoading={isLoading} />;
  return <canvas ref={canvas} style={{ width: '100vw', height: '100vh', backgroundColor: '#54DEFD' }} id="canvas" />;
}

export default index;

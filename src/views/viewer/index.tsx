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
  logo: {
    position: 'absolute',
    top: 20,
    left: 100,
    zIndex: 100,
  }
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
  const [ogImage, setOgImage] = useState('');

  /**
   * TODO. 배포시 prod로 설정하는 script 작성할 것.
   */
  const prod = 'intro_3d';
  const dev = 'dev_intro_3d';

  useEffect(() => {
    async function fetchData() {
      try {
        const querySnapshot = await firestore().collection(dev).where('title', '==', id).get();
        const modelUrl = querySnapshot.docs[0].data().modelUrl;
        const showLanguage = querySnapshot.docs[0].data().showLanguage;
        setModelUrl(modelUrl);
        setIsShowLanguage(showLanguage);
        setOgImage(querySnapshot.docs[0].data().ogImage);
        setLoading(false);

        const path = querySnapshot.docs[0].ref.path;
        setPath(path);

        const iconSnapshot = await firestore()
          .collection(path + '/icons')
          .get();

        const icons = [];
        iconSnapshot.docs.forEach((doc) => {
          const inputData = {
            ...doc.data(),
            position: {
              x: doc.data().x,
              y: doc.data().y,
              z: doc.data().z,
            },
            caption: doc.data().label[selectedLanguage],
          };
          icons.push(inputData);
        });
        setIcons(icons);
      } catch (error) {
        console.error('fetchData : ' + error);
      }
    }

    fetchData();
  }, []);

  async function fetchCategoryData() {
    try {
      const contentPath = `${path}/${selectedLanguage}`;
      const languageCategories = await firestore()
        .collection(contentPath)
        .get()
        .then((data) => {
          return data.docs.map((v) => v.data() as Categories);
        });

      if (languageCategories.length > 0) setCategories(languageCategories);
    } catch (error) {
      console.error('fetchCategoryData :', error);
    }
  }

  useEffect(() => {
    fetchCategoryData();

    function setNewIcons() {
      const newIcons = icons.map((v) => ({
        ...v,
        caption: v.label[selectedLanguage],
      }));
      setIcons(newIcons);
    }

    setNewIcons();
  }, [selectedLanguage, path]);

  useEffect(() => {
    if (canvas.current && modelUrl && icons.length > 0) {
      initialize(canvas.current, modelUrl, icons);
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
          {ogImage && (
            <div className={classes.logo}>
              <img src={ogImage} alt="" style={{ width: '150px', height: 'auto'}} />
            </div>
          )}
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

import React, { useEffect, useRef, useState } from 'react';
import { firestore } from '@lib/firebase';
import Loading from '@components/Loading';
import initialize from './initUlsan';
import Category from '@components/Category';
import { Categories } from '@src/types/category';
import { makeStyles } from '@mui/styles';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useParams } from 'react-router';
import initDaejeon from './initDaejeon';

type Props = {};

const useStyles = makeStyles({
  box: {
    position: 'fixed',
    top: 20,
    right: 100,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: '10px',
    zIndex: 100,
  },
  logo: {
    position: 'fixed',
    top: 20,
    left: 100,
    zIndex: 100,
  },
  viewSwitch: {
    position: 'fixed',
    top: '75%',
    left: 100,
    zIndex: 100,
    background: "transparent",
    width: '56px',
    height: '56px',
    borderRight: 0, // 추후 오른쪽도 추가 할 것.
  },
  '@media(max-width: 600px)': {
    box: {
      top: 5,
      right: 25,
    },
    logo: {
      top: 5,
      left: 25,
    },
  },
});

function index({}: Props) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [modelUrl, setModelUrl] = useState('');
  const [icons, setIcons] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [path, setPath] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('kor');
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();
  const [isShowLanguage, setIsShowLanguage] = useState(false);
  const [ogImage, setOgImage] = useState('');
  const [isShowCategory, setIsShowCategory] = useState(false)


  /**
   * TODO. 배포시 prod로 설정하는 script 작성할 것.
   */
  const prod = 'intro_3d';
  const dev = 'dev_intro_3d';

  useEffect(() => {
    async function fetchData() {
      try {
        const querySnapshot = await firestore().collection(prod).where('title', '==', id).get();
        const { modelUrl, showLanguage, ogImage, isShowCategory} = querySnapshot.docs[0].data()

        setModelUrl(modelUrl);
        setIsShowLanguage(showLanguage);
        setOgImage(ogImage);
        setIsShowCategory(isShowCategory)
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
    /**
     * TODO. 추후 Layout으로 변경할 것.
     */
    if (canvas.current && modelUrl && icons.length > 0) {
      id === 'ulsan'
        ? initialize(canvas.current, modelUrl, icons)
        : id === 'daejeon'
        ? initDaejeon(canvas.current, modelUrl, icons)
        : '';
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
              <img src={ogImage} alt="" style={{ width: '150px', height: 'auto' }} />
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
          {categories.length > 0 && <Category value={categories} isShowCategory={isShowCategory}/>}
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

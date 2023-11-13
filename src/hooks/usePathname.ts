import { useLocation } from 'react-router';
const usePathname = () => {
  const location = useLocation();
  return location.pathname.split('/')[1];
};

export default usePathname;

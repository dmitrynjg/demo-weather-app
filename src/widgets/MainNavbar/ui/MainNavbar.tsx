import { Navbar, Container, Nav } from 'react-bootstrap';
import Link from 'next/link';
import { Search } from '@/feutures/search/ui/Search';
import styles from './MainNavbar.module.scss';
import { useGetGeocode } from '@/shared/api/query/useGetGeocode';
import { useCity } from '@/shared/hooks/useCity';
import { useEffect, useMemo } from 'react';

export const MainNavbar = () => {
  const { searchCityText, setSearchCityText, setCity } = useCity();
  const { data, refetch, isLoading } = useGetGeocode({
    city: searchCityText,
  });

  const results = useMemo(() => {
    if (!data) {
      return [];
    }
    const userLang = navigator.language.slice(0, 2); 

    return data?.map((geoCodeItem) => ({
      label: `${geoCodeItem?.localNames?.[userLang] ?? geoCodeItem.name}, ${geoCodeItem.country}`,
      value: geoCodeItem,
    })) || [];
  }, [data]);

  useEffect(() => {
    if (searchCityText.length >= 3) {
      refetch();
    }
  }, [searchCityText, refetch]);

  return (
    <Navbar bg='light' expand='lg' className={`${styles.navbar} mb-3`}>
      <Container fluid>
        <Navbar.Brand as={Link} href='/' className={styles.brand}>
          Прогноз погоды
        </Navbar.Brand>

        <Navbar.Toggle aria-controls='basic-navbar-nav' />

        <Navbar.Collapse id='basic-navbar-nav'>
          <div className={styles.searchWrapper}>
            <Search
              onSearch={setSearchCityText}
              onClickSearchItem={setCity}
              results={results}
              isLoading={isLoading}
            />
          </div>

          <Nav className={styles.navLinks}>
            <Nav.Link as={Link} href='/' className={styles.navLink}>
              Главная
            </Nav.Link>
            <Nav.Link as={Link} href='/favorites' className={styles.navLink}>
              Избранное
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

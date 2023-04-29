import OffersCarousel from "components/home/OffersCarousel";
import RecentSearches from "components/home/RecentSearches";
import RecentViews from "components/home/RecentViews";
import { useSelector } from "react-redux";

function Home() {
  const isAuthenticated = useSelector((store) => store.auth.isAuthenticated);

  return (
    <>
      <OffersCarousel />
      {isAuthenticated && (
        <>
          <RecentSearches />
          <RecentViews />
        </>
      )}
    </>
  );
}

export default Home;

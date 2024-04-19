import HomepageIndex from '@/components/page/homepage/HomepageIndex';
import HomepageData from '@/components/page/homepage/HomepageData';

const Home = async () => {
    const { carousel, highlight } = await HomepageData();

    return <HomepageIndex entries={{ carousel, highlight }} />;
};

export default Home;

export const revalidate = 60;

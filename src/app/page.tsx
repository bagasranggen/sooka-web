import { axiosClient } from '@/libs/fetcher';

import HomepageIndex from '@/components/page/homepage/HomepageIndex';

const Home = async () => {
    const { data } = await axiosClient().get('homepage');

    return <HomepageIndex entries={{ carousel: data.carousel }} />;
};

export default Home;

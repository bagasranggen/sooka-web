import { axiosClient } from '@/libs/fetcher';

import HomepageIndex from '@/components/page/homepage/HomepageIndex';
import { BANNER_CAROUSELS } from '@/libs/mock';

const Home = async () => {
    // const { data } = await axiosClient().get('homepage');

    return <HomepageIndex entries={{ carousel: BANNER_CAROUSELS }} />;
};

export default Home;

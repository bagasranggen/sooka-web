import { axiosClient } from '@/libs/fetcher';

import HomepageIndex from '@/components/page/homepage/HomepageIndex';

const Home = async () => {
    // const { data: { data } } = await axiosClient().get('homepage');

    // console.log(data.carousel);

    return <HomepageIndex
        entries={{
            carousel: []
        }} />;
};

export default Home;
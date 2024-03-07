import { axiosClient, supabaseClient } from '@/libs/fetcher';

import HomepageIndex from '@/components/page/homepage/HomepageIndex';

const Home = async () => {
    const {
        data: { data },
    } = await axiosClient().get('homepage');
    const supabase = supabaseClient();
    const { data: notes } = await supabase.from('navigation').select();

    console.log('homepage', notes);

    // console.log(data.carousel);
    return <HomepageIndex entries={{ carousel: data.carousel }} />;
};

export default Home;

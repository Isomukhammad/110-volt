import ContactsInfo from '../../components/ContactsInfo/ContactsInfo';
import DiscountTabs from '../../components/DiscountTabs/DiscountTabs';
import PagePath from '../../components/PagePath/PagePath'
import { useData } from '../../context/dataContext';
import { nextAxios } from '../../utils/axios';
import HeadInfo from '../../utils/HeadInfo';

const ContactsPage = ({ contacts }) => {
    const { settings, settingsVal } = useData();

    if (!settingsVal) {
        return (
            <>
                <HeadInfo
                    title={contacts.seo_title}
                    description={contacts.meta_description}
                    keywords={contacts.meta_keywords}
                />

                <PagePath
                    paths={[
                        {
                            "url": "/",
                            "name": "Главная"
                        },
                        {
                            "url": "",
                            "name": contacts.name
                        }
                    ]}
                />

                <div className='mb-20'>
                    <h1 className='font-bold text-[24px] lg:text-[32px] mt-10 mb-12'>{contacts.seo_title}</h1>
                    <div className='flex flex-col gap-20 lg:grid lg:grid-cols-[25%_75%]'>
                        <div className='lg:max-w-[344px]'>
                            <ContactsInfo />
                        </div>

                        <div className='rounded-base overflow-hidden lg:[&>iframe]:h-full' dangerouslySetInnerHTML={{ __html: settings.map }} />
                    </div>
                    <div className='lg:hidden'>
                        <DiscountTabs />
                    </div>
                </div>
            </>
        )
    }
}

export const getServerSideProps = async ({ params }) => {
    const contacts = await nextAxios
        .get(`/pages/2`)
        .then(res => res.data.data)
        .catch(error => console.error(error))

    if (!contacts) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            contacts
        }
    }
}

export default ContactsPage; 
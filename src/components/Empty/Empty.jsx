import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "../Button/Button";

const Empty = ({
    img = '/images/placeholder.jpg',
    title = '',
    description = '',
    btnUrl = '/',
    btnText
}) => {
    const router = useRouter();
    const handlePush = () => router.push(btnUrl);
    return (
        <div className="Empty flex flex-col items-center gap-10">
            <div className="Empty flex flex-col items-center gap-6">
                <Image
                    src={img}
                    alt={title}
                    sizes="100vw"
                    width={0}
                    height={0}
                    className="Empty block w-full max-w-[420px]"
                />
                <div className="Empty flex flex-col gap-3 items-center">
                    <h1 className="Empty text-[24px] font-semibold">{title}</h1>
                    <p className="Empty text-[20px] text-secondary font-medium text-center w-[70%] lg:w-fully">{description}</p>
                </div>
            </div>
            <button
                type="button"
                onClick={handlePush}
                className="Empty text-white font-semibold py-4 px-16 bg-accent rounded-[16px] transition duration-300 hover:bg-accentDark"
            >{btnText}</button>
        </div>
    );
}

export default Empty;
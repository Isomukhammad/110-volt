import Image from "next/image";
import Link from "next/link";
import Button from "../Button/Button";

const NewsEmpty = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div>
                    <Image
                        src={'/images/Studying-rafiki 1.png'}
                        alt=""
                        width={0}
                        height={0}
                        sizes="100vw"
                    />
                    <h2>Здесь пока ничего нету</h2>
                    <p>Наши редакторы уже в процессе написания новой статьи</p>
                    <Link href='/'>
                        <Button>Вернуться на главную</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default NewsEmpty;
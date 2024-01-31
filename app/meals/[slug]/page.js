import { getMeal } from '@/lib/meals';
import classes from './page.module.css';
import Image from 'next/image';
import { notFound } from 'next/navigation';

//for dynamic pages, we can generate the meta data.
export async function generateMetadata({ params }) {
    const meal = getMeal(params.slug);

    if (!meal) {
        notFound();
    }

    return {
        title: meal.title,
        description: meal.summary
    }
};

export default function MealPage({ params }) {
    const meal = getMeal(params.slug);

    if (!meal) {
        notFound();
    }

    return <>
        <header className={classes.header}>
            <div className={classes.image}>
                <Image src={meal.image} fill />
            </div>

            <div className={classes.headerText}>
                <h1>{meal.title}</h1>

                <p className={classes.creator}>by
                    <a href={`MAILTO:${meal.creator_email}`}>{meal.creator}</a>
                </p>

                <p className={classes.summary}>{meal.summary}</p>
            </div>
        </header>
        <main>
            <p className={classes.instructions} dangerouslySetInnerHTML={{
                __html: meal.instructions.replace(/\n/g, '<br/>'),
            }}></p>
        </main>
    </>
} 
import React from 'react';
import Link from 'next/link';

export default function NotFound(): React.ReactElement {
    return (
        <section className="ts--padding mt-10">
            <div className="container text-center error-section">
                <h2>Not Found</h2>
                <p>Could not find requested resource</p>
                <Link href="/">Return Home</Link>
            </div>
        </section>
    );
}

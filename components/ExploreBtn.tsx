'use client';

import Image from "next/image";
import posthog from "posthog-js";

export default function ExploreBtn () {
    return (
        <button 
            type="button" 
            id="explore-btn" 
            className="mt-7 mx-auto" 
            onClick={() => { console.log('Click'); posthog.capture('explore_clicked'); }}>
                <a href="#events">
                    Explore Events
                    <Image src="/icons/arrow-down.svg" alt="arrow-dow" width={24} height={24} />

                </a>
                
            </button>
    )
}
import React from 'react';

import styles from './index.module.scss';

import * as I from './types/interfaces';

const Loader = ({ }: I.LoaderProps) => {
    return (
        <svg className={styles.loader} width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.9883 0C14.825 0 9.92034 1.96803 6.17763 5.54174C2.44776 9.10308 0.25414 13.8876 0.00115827 19.0137C-0.011681 19.2737 0.0826642 19.5277 0.262129 19.7163C0.441785 19.9049 0.690772 20.0116 0.951077 20.0116H5.25092C5.7526 20.0116 6.16812 19.6219 6.19998 19.1213C6.66324 11.8729 12.7198 6.19502 19.9884 6.19502C27.6068 6.19502 33.8049 12.3932 33.8049 20.0116C33.8049 27.6301 27.6068 33.8283 19.9884 33.8283C18.2661 33.8283 16.5862 33.5157 14.9952 32.899L16.6468 31.432C16.9023 31.2081 17.0189 30.8648 16.9528 30.5315C16.8866 30.1981 16.6476 29.9256 16.3258 29.8162L5.57884 26.7203C5.25672 26.6111 4.9015 26.6816 4.64585 26.9056C4.3904 27.1295 4.2737 27.4727 4.3398 27.806L6.61826 38.3427C6.68445 38.676 6.92345 38.9487 7.2451 39.058C7.56684 39.1671 7.92245 39.0968 8.17809 38.8729L9.94697 37.3228C12.9852 39.0893 16.4575 40.0233 19.9884 40.0233C31.0227 40.0233 40 31.046 40 20.0116C40 8.97716 31.0227 0 19.9883 0Z" fill="url(#paint0_linear_112_191)" fill-opacity="0.7" />
            <defs>
                <linearGradient id="paint0_linear_112_191" x1="-13" y1="-8.5" x2="40" y2="32" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#603DC6" />
                    <stop offset="1" stop-color="#D6C8FD" />
                </linearGradient>
            </defs>
        </svg>


    );
};

export default Loader;
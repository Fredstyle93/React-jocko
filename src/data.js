import Sound from 'react-sound';
import React from 'react';
import {FaBeer, FaTag} from "react-icons/fa";
import file1 from './sounds/Jocko_1.mp3'
import file2 from './sounds/Jocko_2.mp3'
import file3 from './sounds/Jocko_3.mp3'
import file4 from './sounds/Jocko_4.mp3'
import file5 from './sounds/Jocko_5.mp3'
import file6 from './sounds/Jocko_6.mp3'
import file7 from './sounds/Jocko_7.mp3'
import file8 from './sounds/Jocko_8.mp3'

import img1 from './images/jocko_1.jpg'
import img2 from './images/jocko_2.jpg'
import img3 from './images/jocko_3.jpg'
import img4 from './images/jocko_4.jpg'
import img5 from './images/jocko_5.jpg'
import img6 from './images/jocko_6.jpg'
import img7 from './images/jocko_7.jpg'
import img8 from './images/jocko_8.jpg'

import good from './sounds/good.mp3';
import quick1 from './sounds/quick1.mp3';
import quick2 from './sounds/quick1.mp3';

export const quickSound = [
    {
        url: good,
        icon: "check-square",
        id: 0,
        isSelected:false,
    },
    {
        url: quick1,
        icon: "coffee",
        id: 1,
        isSelected:false,
    },
    {
        url: quick2,
        icon: "air-freshener",
        id: 2,
        isSelected:false,
    },
];

export const songsData = [
    {
        id: 1,
        title: "Disapointing",
        isLiked: false,
        url: file1,
        imageUrl: img1,
        userId:""
    },
    {
        id: 2,
        title: "Giving up ",
        isLiked: false,
        url: file2,
        imageUrl: img2,
        userId:""

    },
    {
        id: 3,
        title: "Good ",
        isLiked: false,
        url: file3,
        imageUrl: img3,
        userId:""
    },
    {
        id: 4,
        title: "Something wrong",
        isLiked: false,
        url: file4,
        imageUrl: img4,
        userId:""
    },
    {
        id: 5,
        title: "Horrible situations",
        isLiked: false,
        url: file5,
        imageUrl: img5,
        userId:""
    },
    {
        id: 6,
        title: "Gain perspective",
        isLiked: false,
        url: file6,
        imageUrl: img6,
        userId:""
    },
    {
        id: 7,
        title: "Stress",
        isLiked: false,
        url: file7,
        imageUrl: img7,
        userId:""
    },
    {
        id: 8,
        title: "Control",
        isLiked: false,
        url: file8,
        imageUrl: img8,
        userId:""
    },
]
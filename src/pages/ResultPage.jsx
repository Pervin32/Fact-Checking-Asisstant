import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Doğruluq təhlili üçün sadə qaydalarla bir funksiya
const calculateScore = (text) => {
    let score = 50; // Başlanğıc dəyəri
    const trustedSources = ["gov", "edu", "org", "az"]; // Güvənilən domenlər
    const lowerCaseText = text.toLowerCase();

    // Dövlət saytlarına istinad varsa, bal artır
    if (trustedSources.some(source => lowerCaseText.includes(source))) {
        score += 30;
    }

    // Sosial media və ya qeyri-rəsmi mənbələr varsa, bal azaldılır
    if (lowerCaseText.includes("facebook") || lowerCaseText.includes("twitter")) {
        score -= 20;
    }

    return Math.max(0, Math.min(score, 100)); // Bal 0-100 aralığında olmalıdır
};

const getCategoryScore = (score) => {
    if (score === 0) return 'text-black';
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    
    return 'text-red-500';
};

const ResultPage = ({ groupedHistory }) => {
    const location = useLocation();
    const { sources, recommendations } = location.state || { sources: [], recommendations: [] };
    const [expandedItems, setExpandedItems] = useState({});
    const [latestSearch, setLatestSearch] = useState({ text: null, url: null });
    const [score, setScore] = useState(0); // Əvvəlcədən müəyyən edilmiş score

    useEffect(() => {
        const allSearches = Object.values(groupedHistory).flat();
        if (allSearches.length > 0) {
            const latest = allSearches[allSearches.length - 1];
            setLatestSearch({ text: latest.text, url: latest.url });

            // Mətnin doğruluq analizi əsasında yeni score təyin et
            const newScore = calculateScore(latest.text);
            setScore(newScore);
        }
    }, [groupedHistory]);



    
    return (
        <div className="flex flex-col text-center min-h-screen p-6">
            <div className="mt-[74px] text-center w-[246px] h-[27px] rounded-[17px] mx-auto bg-red-400 "></div>

            <div className="mb-12 mt-[53px] flex flex-col justify-center items-center text-center">
                <div className={`font-semibold border-t border-black w-[234px] text-5xl leading-[72px] mx-auto  pt-[19px] ${getCategoryScore(score)}`}>
                    {score}
                </div>

                <h2 className="text-xl font-semibold mb-2">Ümumi bal</h2>

                <div className="mt-4 p-2 rounded-md text-center">
                    <p className="text-sm font-normal text-[15px] leading-6 w-[576px] ">
                        Daxil etdiyin mətn/link rəsmi dövlət qurumlarına, hökumət saytlarına, qanunvericilik orqanlarına və ya digər dövlət müəssisələrinə istinad edib deyə faktları etibarlı edir.
                        Məqalədə etibarlı şəxslərdən, mövzu ilə əlaqəli mütəxəssislərin fikirlərinə yer verilib. Amma son abzasda sosial mediaya istinad edilməsi və verilmiş rəqəmlərin rəsmi mənbələrdən olmaması bəzi faktları şübhə altına ala bilir.
                        Buna görə, diqqətli olmanı tövsiyə edirik.
                    </p>

                    {latestSearch.url && (
                        <a href={latestSearch.url} className="text-blue-500 text-xs md:text-sm mt-1 block">
                            {latestSearch.url}
                        </a>
                    )}
                </div>

                <div className="border border-black w-[744px] h-[174px] rounded-2xl mt-12"></div>
            </div>
        </div>
    );
};

export default ResultPage;

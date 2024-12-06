// Result.jsx faylını yaradırıq
import React from 'react'; // React kitabxanasını import edirik
import { Link } from 'react-router-dom'; // React Router Link komponentini import edirik, linklər üçün istifadə olunur
import logo from '@/assets/img/logo_dashboard.svg'; // Loqonun şəkil faylını import edirik
import pen from '@/assets/img/pen.svg'; // Qələm ikonunun şəkil faylını import edirik
import enter from '@/assets/img/enter.svg'; // Giriş ikonunun şəkil faylını import edirik
import ResultPage from './ResultPage';


// Tarixə əsasən kateqoriya almaq üçün funksiya
const getDateCategory = (date) => {
    const today = new Date(); // Bu günü alırıq
    const searchDate = new Date(date); // Axtarış tarixini alırıq
    const daysDiff = (today - searchDate) / (1000 * 60 * 60 * 24); // Gün fərqini hesablayırıq (bu günlə axtarış tarixi arasındakı günlər)

    // Fərq 7 gündən azdırsa, 'Son 7 gün' qaytarır
    if (daysDiff <= 7) return 'Son 7 gün';
    // Fərq 30 gündən azdırsa, 'Son 30 gün' qaytarır
    if (daysDiff <= 30) return 'Son 30 gün';

    // Əks halda, ay və il olaraq tarixi formatlayırıq və qaytarırıq
    return `${searchDate.toLocaleString('default', { month: 'long' })} ${searchDate.getFullYear()}`;
};

// Result komponentini yaradırıq, searchHistory prop-u ilə
const Result = ({ searchHistory = [] }) => {
    // searchHistory-ni tarixi kateqoriyalara bölürük
    const groupedHistory = Array.isArray(searchHistory) && searchHistory.length > 0
        ? searchHistory.reduce((acc, item) => {
            const category = getDateCategory(item.date); // Hər bir item üçün tarix kateqoriyasını alırıq
            acc[category] = acc[category] || []; // Hər kateqoriya üçün yeni massiv yaradırıq, əgər mövcud deyilsə
            acc[category].push(item); // Item-i müvafiq kateqoriyaya əlavə edirik
            return acc; // Yığılan kateqoriyaları geri qaytarırıq
        }, {})
        : {}; // Əgər searchHistory boşdursa, boş obyekt qaytarırıq

    // JSX strukturu qaytarırıq
    return (
        <div className="md:grid md:grid-cols-[268px_1fr] h-screen">
            {/* Sidebar üçün aside element */}
            <aside className="p-4 md:p-9 border md:border-r border-[#C8C8C8] md:h-screen">
                {/* Loqo və qələm ikonunu göstərən div */}
                <div className="flex items-center justify-between mb-6 md:mb-12">
                    <Link to="/"><img src={logo} alt="logo" className="w-[100px] md:w-[129px] h-[35px] md:h-[45px]" /></Link> {/* Loqo */}
                    <Link to="/textinput"> {/* Link qələm ikonasına */}
                        <img src={pen} alt="pen" className="w-5 h-5 md:w-6 md:h-6" /> {/* Qələm ikonu */}
                    </Link>
                </div>

                {/* Axtarış tarixçəsini göstərən div */}
                <div className="pr-2 md:pr-[23px] overflow-hidden">
                    {Object.keys(groupedHistory).length ? ( // Əgər tarixçədə element varsa
                        Object.keys(groupedHistory).map((category, index) => ( // Hər kateqoriya üçün loop
                            <div key={index}>
                                <h3 className="font-bold mb-2 text-sm">{category}</h3> {/* Kateqoriya başlığı */}
                                <ul className="space-y-2 mb-4 md:mb-6">
                                    {groupedHistory[category].map((item, idx) => ( // Hər bir tarixçəni göstəririk
                                        <li key={idx} className="p-2 rounded-md  cursor-pointer">
                                            <p className="text-xs md:text-sm text-ellipsis overflow-hidden whitespace-nowrap">
                                                {item.text} {/* Axtarış nəticəsi */}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))
                    ) : (
                        <p className="text-xs md:text-sm">Hələ axtarış yoxdur.</p> // Əgər tarixçə yoxdursa, bu mesajı göstəririk
                    )}
                </div>
            </aside>

            {/* Sağ tərəfdə məzmun üçün div */}
            <div className="grid grid-rows">
                {/* Yuxarı sağ küncdə düymələr */}
                <section className="flex justify-end gap-4 pt-4 pr-4 md:pt-10 md:pr-8 bg-white">
                    <Link to="/result" className="bg-blue w-[80px] md:w-[100px] lg:w-[168px] h-8 md:h-9 text-white rounded-full text-center text-xs md:text-sm lg:text-base flex items-center justify-center">
                        A {/* A link etiketi */}
                    </Link>
                    <Link to="/registration" >
                        <img src={enter} alt="enter" className="size-8 md:size-9" /> </Link>{/* Giriş ikonu */}
                </section>

                {/* ResultPage komponentini göstəririk, groupedHistory-i prop kimi ötürürük */}
                <ResultPage groupedHistory={groupedHistory} />
            </div>
        </div>
    );
};

// Result komponentini export edirik
export default Result;

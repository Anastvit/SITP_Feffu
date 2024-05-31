import React from 'react';
import Navbar from './components/Navbar';
import Gallery from './components/Gallery';
import PhoneDetails from './components/PhoneDetails';
import './App.css';

const phones = [
  {
      name: "Apple iPhone 14 Pro Max",
      description: "Смартфон iPhone 14 Pro Max обрел улучшенную систему камер и дисплей с поддержкой функции Always-On...",
      specs: [
          "Операционная система: iOS 16",
          "Дисплей: OLED, 6,7 дюйма, 2796×1290 пикселей",
          "Платформа: Apple A16",
          "Флеш-память: до 1 ТБ",
          "Основная камера: 48 Мп",
          "Фронтальная камера: 12 Мп",
          "NFC: да"
      ],
      image: require('./apple.jpeg'),
      position: 'top'
  },
  {
      name: "Samsung Galaxy S22 Ultra",
      description: "Смартфон Galaxy S22 Ultra получил стилус, который прячется в корпус...",
      specs: [
          "Операционная система: Android 12",
          "Дисплей: AMOLED, 6,8 дюйма, 3088×1440 точек (Quad HD+)",
          "Платформа: процессор Qualcomm Snapdragon 8 Gen1 или Samsung Exynos 2200",
          "Флеш-память: до 1 ТБ",
          "Основная камера: 108+12+10+10 Мп",
          "Емкость аккумулятора: 5000 мАч",
          "NFC: да"
      ],
      image: require('./samsung.jpeg'),
      position: 'bottom'
  },
    {
        name: "Honor 70",
        description: "Обновление нашумевшего Honor 50. Первый в мире смартфон с сенсором Sony IMX800...",
        specs: [
            "Операционная система: Android 12",
            "Дисплей: 6,67 дюйма, 2400×1080 точек",
            "Платформа: Qualcomm Snapdragon 778G Plus",
            "Флеш-память: до 256 ГБ",
            "Основная камера: 54+50+2 Мп",
            "Емкость аккумулятора: 4800 мАч",
            "NFC: да"
        ],
        image: require('./honor1.jpg'),
        position: 'top'
    },
    {
        name: "Google Pixel 7 Pro",
        description: "Google снова врывается в мир смартфонов. На этот раз — с продвинутой камерой с 5-кратным зумом...",
        specs: [
            "Операционная система: Android 13",
            "Дисплей: 6,7 дюйма, 1440×3120 точек",
            "Платформа: Google Tensor G2",
            "Флеш-память: до 512 ГБ",
            "Основная камера: 50+48+12 Мп",
            "Емкость аккумулятора: 5000 мАч",
            "NFC: да"
        ],
        image: require('./google1.jpg'),
        position: 'bottom'
    }
];

const App = () => {
    return (
        <div className="App">
            <Navbar />
            <Gallery />
            <div className="phone-details-container">
                {phones.map((phone, index) => (
                    <PhoneDetails key={index} phone={phone} />
                ))}
            </div>
        </div>
    );
};

export default App;

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CustomPrevArrow = (props) => {
    const { className, onClick } = props;
    return (
        <div className={className} onClick={onClick} style={{ position: "absolute", top: "50%", left: "10px", zIndex: "1", cursor: "pointer", transform: "translateY(-50%)" }}>
            <span>&#10094;</span>
        </div>
    );
};

const CustomNextArrow = (props) => {
    const { className, onClick } = props;
    return (
        <div className={className} onClick={onClick} style={{ position: "absolute", top: "50%", right: "10px", zIndex: "1", cursor: "pointer", transform: "translateY(-50%) translateX(-50%)" }}>
            <span>&#10095;</span>
        </div>
    );
};

export const ImageSlider = ({ images }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />
    };

    return (
        <Slider {...settings}>
            {images.map((image, index) => (
                <div key={index} className="w-full">
                    <img src={image.path} alt={`Slide ${index}`} style={{ width: "100%", display: "block" }}/>
                </div>
            ))}
        </Slider>
    );
}
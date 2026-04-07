function landing() {
    const items = ['Pizza', 'Burger', 'Sushi'];
    return (
        <div className="landing">
            <div className="about-us">
                <h1>Про нас</h1>
                <img src="https://cdn.motor1.com/images/mgl/Oo3xke/s3/mansory-p9lm-evo-900-porsche-911-turbo-s.jpg"
                     alt=""/>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus massa purus, dapibus sed congue
                    vitae, aliquet sit amet libero. In dictum feugiat metus vitae mollis. Etiam ornare libero libero,
                    sit amet elementum enim finibus a. Pellentesque a maximus dolor, et consectetur magna. Praesent non
                    tempus nulla. Nulla id neque nunc. Fusce eget nunc tempus, tincidunt felis in, condimentum risus.
                    Nullam tincidunt neque eget nibh ullamcorper, nec ornare odio aliquam. Sed non blandit augue.
                    Quisque sit amet quam auctor, porttitor urna nec, hendrerit eros.
                    Morbi tempus massa eu neque porta consectetur. Aliquam et orci at sem consectetur sagittis id ac
                    eros. Aliquam feugiat eros risus, eget imperdiet leo porttitor eu. Maecenas lacinia posuere diam eu
                    auctor. Donec efficitur ante in lacus.</p>
            </div>
            <div className="best-dishes">
                <h2>Популярні страви</h2>
                <div className="dishes-carousel">
                    {items.map((item, index) => (
                        <div className='dish'>{item}</div>
                    ))}
                </div>
            </div>
            <div className="agitate">
                <h2>Харе щолкати носом паця, хавка жде, заходи і замовляй</h2>
                <a href='/login'>Уввійти</a>
            </div>
        </div>
    )
}

export default landing;
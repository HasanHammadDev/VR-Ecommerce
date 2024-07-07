import Header from "../Header/Header";
import Panel from "../Panel/Panel";

const Home: React.FC = () => {
  const images = [
    'https://fakeimg.pl/1000x300/',
    'https://fakeimg.pl/1000x350/',
    'https://fakeimg.pl/1200x350/',
  ];
return (
    <>
        <Header />
        <Panel images={images} />
    </>
);
}

export default Home;
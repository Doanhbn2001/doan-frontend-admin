import { Route, Routes } from 'react-router-dom';
import Plants from '../../components/plants/plants';
import Types from '../../components/types/types';
import AddPlant from '../../components/addPlant/addPlant';
import EditPlant from '../../components/editPlant/editPlant';

const Home = ({ setAdmin }) => {
  return (
    <div className="container" style={{ maxWidth: '1500px' }}>
      <Routes>
        <Route path="/" element={<Plants />} />
        <Route path="/types" element={<Types />} />
        <Route path="/add-plant" element={<AddPlant />} />
        <Route path="/:id" element={<EditPlant />} />
      </Routes>
    </div>
  );
};

export default Home;

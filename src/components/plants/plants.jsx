//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faSquare } from '@fortawesome/free-solid-svg-icons';
import './plants.css';
import { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
// import { Input } from 'reactstrap';
import { Link, Navigate } from 'react-router-dom';
import AdminAPI from '../../API/adminAPI';

const Plants = ({ setAdmin }) => {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState('');
  const [reset, setReset] = useState(true);

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await AdminAPI.getPlants(search);
      if (response.data.error) {
        // localStorage.removeItem('adminId');
        window.location.reload(false);
      } else {
        const plants = response.data.data;
        setList(plants);
      }
    };
    fetchData();
  }, [search, reset]);

  const handelChange = (evt) => {
    setSearch(evt.target.value);
  };

  const handleDelete = (t) => {
    console.log(t._id);
    if (!window.confirm('Bạn có muốn xóa thực vật này?')) return;
    const fetchData = async () => {
      const response = await AdminAPI.deletePlant(t._id);
      console.log(response);
      if (response.data.error) {
        alert(response.data.mess);
        window.location.reload(false);
      } else {
        alert(response.data.mess);
        setReset(!reset);
      }
    };
    fetchData();
  };

  const handelLogout = () => {
    const fetchData = async () => {
      const response = await AdminAPI.getLogout();
      console.log(response);
      if (response.data.ok) {
        setAdmin(false);
        localStorage.removeItem('userId');
        setRedirect(true);
      }
    };
    fetchData();
  };

  return (
    <div>
      {redirect && <Navigate to={`/`} />}
      <div className="pb-5">
        <Link className="titleh1 main pr-4" to="/">
          THỰC VẬT
        </Link>
        <Link className="titleh1 pr-4" to="/types">
          HỌ
        </Link>
        <Link className="titleh1" to="/add-plant">
          THÊM THỰC VẬT
        </Link>
      </div>
      <div className="row">
        <div className="col-4 box-search">
          <input
            className="form-control form-control-lg"
            type="text"
            name="search"
            id="search"
            placeholder="Enter Search!"
            value={search}
            onChange={handelChange}
          />
        </div>
      </div>
      <div className="transactions-box">
        <div className="t-box">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">Tên</th>
                <th scope="col">Họ</th>
                <th scope="col">Chi</th>
                <th scope="col">Image</th>
                {/* <th scope="col">Category</th> */}
                <th scope="col">Edit</th>
              </tr>
            </thead>
            <tbody>
              {list.map((t) => {
                return (
                  <tr key={t._id} className={`row-${list.indexOf(t) % 2}`}>
                    <td>{t._id} </td>
                    <td>{t.name}</td>
                    <td>{t.type && t.type.name}</td>
                    <td>{t.family}</td>

                    <td>
                      <img src={t.img1}></img>
                    </td>
                    <td>
                      <div className="btn-b">
                        <Link to={`/${t._id}`}>
                          <Button color="warning">Sửa</Button>
                        </Link>

                        <Button color="danger" onClick={() => handleDelete(t)}>
                          Xóa
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="space"></div>
        </div>
      </div>
    </div>
  );
};

export default Plants;

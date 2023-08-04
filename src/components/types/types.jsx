//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faSquare } from '@fortawesome/free-solid-svg-icons';
import './types.css';
import { useEffect, useState } from 'react';
// import { Input } from 'reactstrap';
import { Link, Navigate } from 'react-router-dom';
import AdminAPI from '../../API/adminAPI';
import { Button } from 'reactstrap';

const Types = ({ setAdmin }) => {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [reset, setReset] = useState(true);
  const [errorMess, setErrorMess] = useState('Họ thực vật không hợp lệ!!');

  const [redirect, setRedirect] = useState(false);

  const [typeError, setTypeError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await AdminAPI.getTypes(search);
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

  const handelChangeType = (evt) => {
    setType(evt.target.value);
  };

  const handleDelete = (t) => {
    console.log(t._id);
    if (!window.confirm('Bạn muốn xóa họ thực vật: ' + t.name)) return;
    const fetchData = async () => {
      const response = await AdminAPI.deleteType(t._id);
      if (response.data.error) {
        alert(response.data.mess);
      } else {
        alert(response.data.mess);
        setReset(!reset);
      }
    };
    fetchData();
  };

  const addType = () => {
    if (!type) {
      setTypeError(true);
      setErrorMess('Họ thực vật không hợp lệ!!');
    } else {
      const fetchData = async () => {
        const response = await AdminAPI.addType(type);
        if (response.data.error) {
          setTypeError(true);
          setErrorMess(response.data.mess);
          setType('');
        } else {
          alert(response.data.mess);
          setType('');
          setSearch('');
          setReset(!reset);
        }
      };
      fetchData();
    }
  };

  const handelLogout = () => {
    const fetchData = async () => {
      const response = await AdminAPI.getLogout();
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
        <Link className="titleh1 pr-4" to="/">
          THỰC VẬT
        </Link>
        <Link className="titleh1 main pr-4" to="/types">
          HỌ
        </Link>
        <Link className="titleh1" to="/add-plant">
          THÊM THỰC VẬT
        </Link>
        {/* <button className="logout" onClick={handelLogout}>
          LOGOUT
        </button> */}
      </div>
      <div className="row">
        <div className="col-4 box-search">
          <input
            className="form-control form-control-lg"
            type="text"
            name="type"
            id="type"
            placeholder="Nhập tên họ thực vật"
            value={type}
            onChange={handelChangeType}
          />
          {typeError && <span className="text-danger">{errorMess}</span>}
        </div>
        <div className="col-4">
          <Button color="primary bold" size="lg" onClick={addType}>
            Thêm
          </Button>
        </div>
      </div>
      <div className="row">
        <div className="col-4 box-search">
          <input
            className="form-control form-control-lg"
            type="text"
            name="search"
            id="search"
            placeholder="Tìm Kiếm!"
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
                <th scope="col">Số thực vật</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {list.map((t) => {
                return (
                  <tr key={t._id} className={`row-${list.indexOf(t) % 2}`}>
                    <td>{t._id} </td>
                    <td>{t.name}</td>
                    <td>{t.plants.length}</td>
                    <td>
                      <div className="btn-b">
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

export default Types;

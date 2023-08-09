import { Link, Navigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import AdminAPI from '../../API/adminAPI';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import './editPlant.css';

const EditPlant = () => {
  const [redirect, setRedirect] = useState(false);

  const { id } = useParams();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [oldType, setOldType] = useState('');
  const [type, setType] = useState('');
  const [family, setFamily] = useState('');
  const [img1, setImg1] = useState({ preview: '', data: '' });
  const [img2, setImg2] = useState({ preview: '', data: '' });
  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');

  const [shape_p, setShape_p] = useState('');
  const [size_p, setSize_p] = useState('');
  const [surface_p, setSurface_p] = useState('');
  const [aperture_p, setAperture_p] = useState('');
  const [exine_p, setExine_p] = useState('');
  const [structure_p, setStructure_p] = useState('');
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);

  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchData1 = async () => {
      const response = await AdminAPI.getTypes('');
      if (response.data.error) {
        window.location.reload(false);
      } else {
        const types = response.data.data;
        setList(types);
      }
    };
    fetchData1();
    const fetchData = async () => {
      const response = await AdminAPI.getPlant(id);
      if (response.data.error) {
        alert('Can not find this product');
        setRedirect(true);
      } else {
        console.log(response.data);
        setImage1(response.data.data.img1);
        setImage2(response.data.data.img2);
        setName(response.data.data.name);
        setDescription(response.data.data.description);
        setType(response.data.data.type._id);
        setOldType(response.data.data.type._id);
        setFamily(response.data.data.family);
        setShape_p(response.data.data.shape_p);
        setSize_p(response.data.data.size_p);
        setSurface_p(response.data.data.surface_p);
        setAperture_p(response.data.data.aperture_p);
        setExine_p(response.data.data.exine_p);
        setStructure_p(response.data.data.structure_p);
        setLongitude(Number(response.data.data.longitude));
        setLatitude(Number(response.data.data.latitude));
        setImage1(response.data.data.img1);
        setImage2(response.data.data.img2);
        // const types = response.data.data;
        // setList(types);
      }
    };
    fetchData();
  }, []);

  const handleImg1 = (e) => {
    const img1 = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImg1(img1);
  };

  const handleImg2 = (e) => {
    const img2 = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImg2(img2);
  };

  const handleSubmit = () => {
    let formData1 = new FormData();
    formData1.append('img1', img1.data);
    formData1.append('img2', img2.data);
    formData1.append('id', id);
    formData1.append('name', name);
    formData1.append('oldType', oldType);
    formData1.append('oldImg1', image1);
    formData1.append('oldImg2', image2);
    formData1.append('type', type);
    formData1.append('family', family);
    formData1.append('description', description);
    formData1.append('shape_p', shape_p);
    formData1.append('size_p', size_p);
    formData1.append('surface_p', surface_p);
    formData1.append('aperture_p', aperture_p);
    formData1.append('exine_p', exine_p);
    formData1.append('structure_p', structure_p);
    formData1.append('longitude', longitude);
    formData1.append('latitude', latitude);

    const fetchData = async () => {
      const response = await AdminAPI.editPlant(formData1);
      if (response.data.error) {
        alert(response.data.mess);
        window.location.reload(false);
      } else {
        alert(response.data.mess);
        setName('');
        setDescription('');
        setType('');
        setFamily('');
        setShape_p('');
        setSize_p('');
        setSurface_p('');
        setAperture_p('');
        setExine_p('');
        setStructure_p('');
        setRedirect(true);
      }
    };
    fetchData();
  };
  if (redirect) {
    return <Navigate to="/" />;
  }
  return (
    <div>
      {redirect && <Navigate to={`/`} />}
      <div className="pb-5">
        <Link className="titleh1 pr-4" to="/">
          THỰC VẬT
        </Link>
        <Link className="titleh1 pr-4" to="/types">
          HỌ
        </Link>
        <Link className="titleh1 main" to="/add-plant">
          THÊM THỰC VẬT
        </Link>
      </div>
      <div className="title"></div>
      <Form>
        <FormGroup row>
          <Label for="name" sm={2}>
            Tên
          </Label>
          <Col sm={10}>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Điền tên thực vật"
              value={name}
              onChange={(evt) => {
                setName(evt.target.value);
              }}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="type" sm={2}>
            Họ thực vật
          </Label>
          <Col sm={10}>
            <Input
              type="select"
              name="type"
              id="type"
              className="selection"
              value={type}
              onChange={(evt) => {
                setType(evt.target.value);
              }}
            >
              {list &&
                list.map((l) => {
                  return (
                    <option value={l._id} key={l._id}>
                      {l.name}
                    </option>
                  );
                })}
            </Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="family" sm={2}>
            Chi thực vật
          </Label>
          <Col sm={10}>
            <Input
              type="text"
              name="family"
              id="family"
              placeholder="Điền chi thực vật"
              value={family}
              onChange={(evt) => {
                setFamily(evt.target.value);
              }}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="des" sm={2}>
            Mô tả
          </Label>
          <Col sm={10}>
            <Input
              type="textarea"
              name="des"
              id="des"
              value={description}
              onChange={(evt) => {
                setDescription(evt.target.value);
              }}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="img1" sm={2}>
            Ảnh thực vật
          </Label>
          <Col sm={10}>
            <Input type="file" name="img1" id="img1" onChange={handleImg1} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="img2" sm={2}>
            Ảnh phấn hoa
          </Label>
          <Col sm={10}>
            <Input type="file" name="img2" id="img2" onChange={handleImg2} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="shape_p" sm={2}>
            Hình dạng phấn hoa
          </Label>
          <Col sm={10}>
            <Input
              type="text"
              name="shape_p"
              id="shape_p"
              placeholder="Vd: tròn,bầu dục"
              value={shape_p}
              onChange={(evt) => {
                setShape_p(evt.target.value);
              }}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="size_p" sm={2}>
            Kích thước phấn hoa
          </Label>
          <Col sm={10}>
            <Input
              type="text"
              name="size_p"
              id="size_p"
              placeholder="Vd: 20-30 µm"
              value={size_p}
              onChange={(evt) => {
                setSize_p(evt.target.value);
              }}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="surface_p" sm={2}>
            Bề mặt phấn hoa
          </Label>
          <Col sm={10}>
            <Input
              type="text"
              name="surface_p"
              id="surface_p"
              placeholder="Vd: mịn"
              value={surface_p}
              onChange={(evt) => {
                setSurface_p(evt.target.value);
              }}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="aperture_p" sm={2}>
            Bề mặt phấn hoa
          </Label>
          <Col sm={10}>
            <Input
              type="text"
              name="aperture_p"
              id="aperture_p"
              placeholder="Vd: rãnh không đều"
              value={aperture_p}
              onChange={(evt) => {
                setAperture_p(evt.target.value);
              }}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exine_p" sm={2}>
            Gai phấn hoa
          </Label>
          <Col sm={10}>
            <Input
              type="text"
              name="exine_p"
              id="exine_p"
              placeholder="Vd: gai mỏng,sát nhau"
              value={exine_p}
              onChange={(evt) => {
                setExine_p(evt.target.value);
              }}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="structure_p" sm={2}>
            Khẩu độ phấn hoa
          </Label>
          <Col sm={10}>
            <Input
              type="text"
              name="structure_p"
              id="structure_p"
              placeholder="Vd: sọc trên khẩu độ"
              value={structure_p}
              onChange={(evt) => {
                setStructure_p(evt.target.value);
              }}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="longitude" sm={2}>
            Kinh độ
          </Label>
          <Col sm={10}>
            <Input
              type="number"
              name="longitude"
              id="longitude"
              placeholder=""
              value={longitude}
              onChange={(evt) => {
                setLongitude(evt.target.value);
              }}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="latitude" sm={2}>
            Vĩ độ
          </Label>
          <Col sm={10}>
            <Input
              type="number"
              name="latitude"
              id="latitude"
              placeholder=""
              value={latitude}
              onChange={(evt) => {
                setLatitude(evt.target.value);
              }}
            />
          </Col>
        </FormGroup>
        <FormGroup check row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button onClick={handleSubmit} color="primary" size="lg">
              Submit
            </Button>
          </Col>
        </FormGroup>
      </Form>
    </div>
  );
};

export default EditPlant;

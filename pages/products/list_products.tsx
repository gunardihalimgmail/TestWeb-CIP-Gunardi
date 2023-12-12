import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './list_products.module.css';
import db from '../../db';
import { useEffect, useState } from 'react';
import { Alert, Form } from 'react-bootstrap'
import fontawesome from '@fortawesome/fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faAdd, faDeleteLeft, faCross, faCrosshairs, faPlus, faCirclePlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';

library.add(faCoffee, faAdd);

export default function ListProducts(){
    
    const [dataProduct, setDataProduct] = useState([]);
    const [dataSuplier, setDataSuplier] = useState([]);
    const [dataFinal, setDataFinal] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const initialFormData = {
      nama: '',
      deskripsi: '',
      harga: '',
      stok: '',
      foto: '',
      suplier: '',
    };
  
    const [formData, setFormData] = useState(initialFormData);


    useEffect(()=>{
        const fetchData = async() => {
            try {
                const response = await fetch('http://localhost:3000/api/products/get')
                const result = await response.json();
                await setDataProduct(result);

                const responseSup = await fetch('http://localhost:3000/api/suplier/get')
                let resultSup:any = await responseSup.json();
                resultSup.unshift({id_supplier: '', nama_supplier:'',alamat:'', email:''});
                await setDataSuplier(resultSup);

            } catch(error){
                console.error(error)
            }

        }
        fetchData();

    },[])

    const handleFileChange = (event:any) => {
      const file = event.target.files[0];

      if (file) {
        // Lakukan validasi ukuran file
        const maxSizeInBytes = 2097152; // 1 MB (misalnya)
        if (file.size > maxSizeInBytes) {
          setErrorMessage('File size exceeds the maximum allowed size (1 MB).');
          setSelectedFile(null);
        } else {
          setErrorMessage('');
          setSelectedFile(file);
          setFormData((prevData) => ({ ...prevData, foto: file.name }));
        }
      }
    };  

    const handleOpenModal = () => {
      setShowModal(true);
    };

    const handleCloseModal = () => {
      setShowModal(false);
    };

    const handleChange = async (event:any, jenisinput:any) => {
      const { name, value } = event.target;

      await setFormData((prevData) => ({ ...prevData, [name]: value }));
      console.log(formData)
    }

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/products/get');
        const result = await response.json();
        setDataProduct(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    

    const handleSubmit = async() => {

    
      try {
        const payload = {
          nama: formData.nama,
          deskripsi: formData.deskripsi,
          harga: formData.harga,
          stok: formData.stok,
          foto: formData.foto,
          suplier: formData.suplier,
        };
  

        const response = await fetch('http://localhost:3000/api/products/insert', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
    
        if (response.ok) {
          // Berhasil menyimpan data, bisa tambahkan logika atau notifikasi sesuai kebutuhan
          console.log('Data berhasil disimpan!');
          // Reset form setelah penyimpanan berhasil
          setFormData(initialFormData);
          // Tutup modal
          handleCloseModal();
          // Refresh data produk
          fetchData();
          alert("Data Berhasil Disimpan")
        } else {
          console.error('Gagal menyimpan data.');
        }
      } catch (error) {
        console.error('Terjadi kesalahan:', error);
      }
    
    }

    const handleDelete = async (productId: string) => {
        try {
          const response = await fetch(`http://localhost:3000/api/products/delete?id=${productId}`, {
            method: 'DELETE',
          });
    
          if (response.ok) {
            // Refresh data produk setelah penghapusan berhasil
            fetchData();
            console.log('Product deleted successfully');
          } else {
            console.error('Failed to delete product');
          }
        } catch (error) {
          console.error('Error:', error);
      }
    }

    const handleUpdate = async (productId: string) => {
      try {
 
        const updatedData = {
          nama: 'Nama Baru', 
          deskripsi: 'Deskripsi Baru', 
          harga: 10000, 
          stok: 50, 
          foto: 'nama-foto-baru.jpg', 
          suplier: 'id-suplier-baru'
        };
  
        const response = await fetch(`http://localhost:3000/api/products/update?id=${productId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        });
  
        if (response.ok) {
          // Refresh data produk setelah pembaruan berhasil
          fetchData();
          console.log('Product updated successfully');
        } else {
          console.error('Failed to update product');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  

  
  return (
      <>
        <div className={`${styles.container}`}>

            <h3 className={[styles.h3].join(' ')}> Product </h3>
        

                <div className='d-flex justify-content-end'>

                    {/* <div><span className={`${styles.actionplus}`}><FontAwesomeIcon icon={faCirclePlus} onClick={handleOpenModal}/></span></div> */}
                    <div className='btn btn-block btn-success text-white' onClick={handleOpenModal}>Tambah</div>
                </div>
            <div className={`${styles.containerTable}`}>
                <table className={`table ${styles.table}`}>
                    <thead>
                        <tr>
                            <th className={`${styles.column1}`}>Nama</th>
                            <th className={`${styles.column2}`}>Deskripsi</th>
                            <th className={`${styles.column3}`}>Harga</th>
                            <th className={`${styles.column4}`}>Stok</th>
                            <th className={`${styles.column5}`}>Foto</th>
                            <th className={`${styles.column6}`}>Supplier</th>
                            <th className={`${styles.column7}`}>Action</th>
                        </tr>
                    </thead>
                </table>
            </div>

            <div className={`${styles.containerBodyTable}`}>
                <table className={`table table-hover ${styles.table}`}>
                    <tbody>
                        {
                            // Array.from({length:30}).map((_,index)=>{
                              dataProduct && Array.isArray(dataProduct) && dataProduct.map((obj, index)=>{
                                return (
                                    <tr key={index}>
                                        <td className={`${styles.column1}`}>{obj?.['nama']}</td>
                                        <td className={`${styles.column2}`}>{obj?.['deskripsi']}</td>
                                        <td className={`${styles.column3}`}>{parseFloat(obj?.['harga']).toLocaleString('id-ID',{style:'currency', currency:'IDR', maximumFractionDigits:0})}</td>
                                        <td className={`${styles.column4}`}>{obj?.['stok']}</td>
                                        <td className={`${styles.column5}`}>
                                            {obj?.['foto'] && obj?.['foto'] != '' ? (
                                              <img src={`/uploads/products/${obj?.['foto']}`} alt="foto" style={{ width: '100%', height: '90px', maxWidth: '100%', maxHeight: '100%' }} />
                                            ) : (
                                              <span>No Image Available</span>
                                            )}
                                        </td>
                                        <td className={`${styles.column6}`}>{obj?.['nama_suplier']}</td>
                                        <td className={`${styles.column7}`}>
                                            <span className={`${styles.actiontrash}`} 
                                                onClick={() => handleDelete(obj?.['id'])}>
                                                  <FontAwesomeIcon icon={faTrash}/></span>
                                        </td>
                                    </tr>
                                )
                            })
                        }
              
                    </tbody>
                </table>
            </div>
            
            
        </div>

        <Modal show={showModal} onHide={handleCloseModal} centered>
            <Modal.Header className={`${styles.modalheader}`} closeButton>
              <Modal.Title>Bootstrap Modal</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group controlId="examform.ControlInput1" className={`${styles.controlinput1}`}>
                        <Form.Label className={`${styles.grouplabel}`}>Nama Product</Form.Label>
                        <Form.Control type="text" placeholder="Input Nama Product" name="nama"
                                    value={formData.nama}
                                    onChange={(event)=>handleChange(event,'nama')} />
                    </Form.Group>

                    <Form.Group controlId="examform.ControlInput2" className={`${styles.controlinput}`}>
                        <Form.Label className={`${styles.grouplabel}`}>Deskripsi</Form.Label>
                        <Form.Control type="text" placeholder="Input Deskripsi"  
                                    name="deskripsi"
                                    value={formData.deskripsi}
                                    onChange={(event)=>handleChange(event,'deskripsi')}/>
                    </Form.Group>

                    <Form.Group controlId="examform.ControlInput3" className={`${styles.controlinput}`}>
                        <Form.Label className={`${styles.grouplabel}`}>Harga</Form.Label>
                        <Form.Control type="number" placeholder="Input Harga"  
                                  name="harga"
                                  value={formData.harga}
                                  onChange={(event)=>handleChange(event,'harga')}/>
                    </Form.Group>

                    <Form.Group controlId="examform.ControlInput4" className={`${styles.controlinput}`}>
                        <Form.Label className={`${styles.grouplabel}`}>Stok</Form.Label>
                        <Form.Control type="number" placeholder="Input Stok"  
                              name="stok"
                              value={formData.stok}
                              onChange={(event)=>handleChange(event,'stok')}/>
                    </Form.Group>

                    <Form.Group controlId="examform.ControlInput5" className={`${styles.controlinput}`}>
                        <Form.Label className={`${styles.grouplabel}`}>Foto</Form.Label>
                        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                        <Form.Control type="file" onChange={handleFileChange} placeholder="Foto" accept=".jpg, .jpeg, .png"  />
                    </Form.Group>

                    <Form.Group controlId="examform.ControlSelect1" className={`${styles.controlinput}`}>
                        <Form.Label className={`${styles.grouplabel}`}>Supplier</Form.Label>
                        <Form.Select
                              name="suplier"
                              value={formData.suplier}
                              onChange={(event) => handleChange(event, 'suplier')}
                        >
                            {
                              dataSuplier.map((obj,idx)=>{
                                return (
                                  <option value={obj?.['id_suplier']}
                                      key={obj?.['id_suplier'] + obj?.['nama_suplier']}>{obj?.['nama_suplier']}</option>
                                )
                              })
                            }
                        </Form.Select>
                    </Form.Group>

                </Form>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSubmit}>
                Save Changes
              </Button>
            </Modal.Footer>

        </Modal>
      </>
  );
};


import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './list_products.module.css';
import db from '../../db';
import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap'

export default function ListProducts(){
    
    const [dataProduct, setDataProduct] = useState([]);

    useEffect(()=>{
        const fetchData = async() => {
            try {
                const response = await fetch('http://localhost:3000/api/products/get')
                const result = await response.json();
                setDataProduct(result);
            } catch(error){
                console.error(error)
            }
        }
        fetchData();
    },[])

  return (
      <>
        <div className={`${styles.container}`}>

            <h3 className={[styles.h3].join(' ')}> Product </h3>
            {/* <div className={`${styles.containerTable}`}>
                <table className={`table ${styles.table}`}>
                    <thead>
                        <tr>
                            <th className={`${styles.column1}`}>Nama</th>
                            <th className={`${styles.column2}`}>Deskripsi</th>
                            <th className={`${styles.column3}`}>Harga</th>
                            <th className={`${styles.column4}`}>Stok</th>
                            <th className={`${styles.column5}`}>Foto</th>
                            <th className={`${styles.column6}`}>Supplier</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Array.from({length:30}).map((_,index)=>{
                                return (
                                    <tr key={index}>
                                        <td className={`${styles.column1}`}>AC001</td>
                                        <td className={`${styles.column2}`}>AC Remote {index+1}</td>
                                        <td className={`${styles.column3}`}>Rp. 100.000</td>
                                        <td className={`${styles.column4}`}>{30 + index}</td>
                                        <td className={`${styles.column5}`}>Foto</td>
                                        <td className={`${styles.column6}`}>Supplier</td>
                                    </tr>
                                )

                            })
                        }
                    </tbody>
                </table>
            </div> */}
            <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlSelect1">
                    <Form.Label>Select Example</Form.Label>
                    <Form.Select>
                    <option>Option 1</option>
                    <option>Option 2</option>
                    <option>Option 3</option>
                    {/* ... tambahkan opsi sesuai kebutuhan */}
                    </Form.Select>
                </Form.Group>
            </Form>

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
                        </tr>
                    </thead>
                </table>
            </div>

            <div className={`${styles.containerBodyTable}`}>
                <table className={`table table-hover ${styles.table}`}>
                    <tbody>
                        {
                            // Array.from({length:30}).map((_,index)=>{
                            dataProduct.map((obj, index)=>{
                                return (
                                    <tr key={index}>
                                        <td className={`${styles.column1}`}>{obj?.['nama']}</td>
                                        <td className={`${styles.column2}`}>{obj?.['deskripsi']}</td>
                                        <td className={`${styles.column3}`}>{parseFloat(obj?.['harga']).toLocaleString('id-ID',{style:'currency', currency:'IDR', maximumFractionDigits:0})}</td>
                                        <td className={`${styles.column4}`}>{obj?.['stok']}</td>
                                        <td className={`${styles.column5}`}>
                                            <img src = {`/uploads/products/${obj?.['foto']}`} alt = "foto" style={{width:'100%', height:'90px', maxWidth:'100%', maxHeight:'100%'}}/>
                                        </td>
                                        <td className={`${styles.column6}`}>{obj?.['nama_suplier']}</td>
                                    </tr>
                                )
                            })
                        }
              
                    </tbody>
                </table>
            </div>
            
            
        </div>
      </>
  );
};


export async function getStaticProps() {
    try {
      const rows = await new Promise((resolve, reject) => {
        db.get('SELECT * FROM produk', (err: any, rows: any) => {
          if (err) {
            console.error(err);
            reject([]);
          } else {
            console.log(rows);
            resolve(rows);
          }
        });
      });
      alert(rows)
  
      return {
        props: {
          datates: rows,
        },
      };
    } catch (error) {
      console.error('TIDAK ADA');
      return {
        props: {
          datates: [],
        },
      };
    }
  }

// export async function getStaticProps() {
//     return {
//         props:{
//             datates:'goooood'
//         }
//     }
//     // try{
//     //     const rows = await new Promise((resolve, reject)=>{
//     //         db.all('SELECT * FROM produk', (err:any, rows:any)=>{
//     //             if (err){
//     //                 console.error(err);
//     //                 reject([]);
//     //             }
//     //             else{
//     //                 console.log(rows)
//     //                 resolve(rows);
//     //             }
//     //         });
//     //     });
    
//     //     return {
//     //         props:{
//     //             data: rows
//     //         }
//     //     }
//     // }catch(error){
//     //     console.error('TIDAK ADA')
//     //     return {
//     //         props: {
//     //             data: []
//     //         }
//     //     }
//     // }
// }
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './list_products.module.css';

export default function ListProducts(){
  
  return (
      <>
        <div className={`${styles.container}`}>
            <h3 className={[styles.h3].join(' ')}> List Product </h3>
            <table className={`table table-striped table-hover ${styles.table}`}>
                <thead>
                    <tr>
                        <th scope='col'>Kode</th>
                        <th scope='col'>Nama</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className={`${styles.row}`} >
                        <td>AC001</td>
                        <td>AC Remote</td>
                    </tr>
                    <tr className={`${styles.row}`} >
                        <td>AC001</td>
                        <td>AC Remote</td>
                    </tr>
                    <tr className={`${styles.row}`} >
                        <td>AC001</td>
                        <td>AC Remote</td>
                    </tr>
                </tbody>
            </table>
            
        </div>
      </>
  );
}

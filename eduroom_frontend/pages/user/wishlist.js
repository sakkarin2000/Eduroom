import React,{Fragment,useState,useEffect,useContext} from 'react';
import Wishlists from '../../components/user/wishlists';
import General from '../../components/template/general'
import api from '../../api';
import { useRouter } from 'next/router'

// import React,{Fragment,useState,useEffect} from 'react';
// import General from '../../components/template/general'
// import api from '../../api';
// import { useRouter } from 'next/router'
import utils from '../../styles/course/utils';
import Link from 'next/link';

const Wishlist = () => {
//     let con='';
//     let order='addtime desc';
//     useEffect(()=>{
//         const fetchData=async()=>{
//             try{
//                 const res=await api.get('api/user/getWishlist', {
//                     params:{
//                         condition:'',
//                         orderby: 'addtime desc'
//                     }
//                   });
//                 setTotalList(res.data);
// 			} catch (err) {
// 				router.push('/login')
// 			}
//         }
//         fetchData();
//     },[]);
//     const router = useRouter()
//     const[totalList,setTotalList]=useState([]);
//     const del=(courseid)=>{
//         api.post('api/user/deleteWishlist', {
//                 courseid:courseid
//         }).then(()=>{
//             searchEngine(con,order);
//         });
//     }

//     const searchEngine=(condition,orderby)=>{
//         api.get('api/user/getWishlist', {
//             params:{
//                 condition: condition,
//                 orderby: orderby
//             }
//         }).then((response)=>{
//             setTotalList(response.data);
//         });
//         con=condition;
//         order=orderby;
//     };

//     const searching=()=>{
//         let searchvalue=document.getElementById('search').value;
//         let sortvalue=document.getElementById('sort').value;

//         let search='';
//         if(searchvalue!==''){
//             search='and upper(coursename) like upper(\'%'+searchvalue+'%\')'
//         }

//         let sort;
//         switch(sortvalue){
//             case'add time':sort='addtime desc';break;
//             case'title':sort='coursename asc';break;
//             case'price':sort='price asc';break;
//         }

//         searchEngine(search,sort);
//     }

//     return (
//     <Fragment>
//         <General>
//                 <center>
//                 <h1>Wishlist</h1>
                
//                 <input type="text" id="search" placeholder='Search course'></input>
//                 <br></br>
//                 Sort by
//                 <select id='sort' >
//                     <option>add time</option>
//                     <option>title</option>
//                     <option>price</option>
//                 </select>
//                 <button onClick={()=>{searching()}}>Search</button>
//                 </center>
//             <Wishlists item={totalList} remove={del}></Wishlists>
//         </General>
//     </Fragment>
//     )
// }

//////////////////////////////////////////

    useEffect(()=>{
        const fetchData=async()=>{
            try{
                const res=await api.get('api/user/getWishlist', {
                    params:{
                        condition:'',
                        orderby: 'addtime desc'
                    }
                });
                setCourseDes(res.data);
            } catch (err) {
                router.push('/login')
            }
        }
        fetchData();
    },[]);

    let con='';
    let order='addtime desc';
    const [courseDes, setCourseDes] = useState([])
    const router = useRouter()
    const [search, setSearch] = useState('')
    const [category,setCategory]=useState(
        [
        {value:'coursename asc',
        cataname:'Title'},

        {value:'price asc',
        cataname:'Price'}
        ]
    );
    
const del=(courseid)=>{
    api.post('api/user/deleteWishlist', {
            courseid:courseid
    }).then(()=>{
        searchEngine(con,order);
    });
}

const searchEngine=(condition,orderby)=>{
    api.get('api/user/getWishlist', {
        params:{
            condition: condition,
            orderby: orderby
        }
    }).then((response)=>{
        setCourseDes(response.data);
    });
    con=condition;
    order=orderby;
};

    const searching=()=>{
        let searchvalue='';
        if(search!==''){
            searchvalue='and upper(coursename) like upper(\'%'+search+'%\')'
        }
        let sortvalue=document.getElementById('sorting').value;
        if(sortvalue=='Sort Type') sortvalue='addtime desc';

        searchEngine(searchvalue,sortvalue);
    }

    // const coursetype=(boolean)=>{
    //     setSearch('');
    //     document.getElementById('sorting').selectedIndex=0;
    //     searchEngine(boolean,'','addtime desc');
    // }

    // const checkComplete=(boolean)=>{
    //     if(boolean) return 'Completed';
    //     else return 'Progressing';
    // }
	const handleChangeSearch = (e)=>{
		setSearch(e.target.value);
	}
	const handleEnter = (e)=>{
		if(e.key == 'Enter'){
			searching();
		}
	}
    const selectSort = (e)=>{
        searching();
    }
    
  return (
    <Fragment>
      <General>
        <div className='bg'>
          <div className='container-1'>

            <center>
                 <h1>Wishlist</h1>
             </center>

            <div className='text-center flex my-6 mx-search'>

            <div className="shadow searchCourse">
			<i className="fas fa-search"></i>
			<input className='font-quicksand input-tab rounded-sss font-normal-bold searchBox' type="text" placeholder="Search Course"  value={search} onChange={handleChangeSearch} onKeyUp={handleEnter}></input>
			</div>


              <select id='sorting' className='font-quicksand font-normal-bold cate-tab bg-white pointer rounded-sss shadow text-grey cateBox' 
                      onChange={selectSort}>
                <option>
                  Sort Type
              </option>
                {category.map((el, idx) => {
                  return (
                    <option value={el.value}>
                      {el.cataname}
                    </option>
                  )
                })}
              </select>
            </div>

            <div className='text-center my-8'>
              {courseDes.map((e, index) => (
                // <div>
                // <div style={{margin: '7px 0 0 0'}}>
                    
                // </div>
                <span>
                
                  <div className='mx-6 my-6 box-1 bg-white inline-block shadow rounded-sm pointer'>
                    <i className="fas fa-trash icon"  style={{ display: 'flex', justifyContent: 'flex-end'}} onClick={()=>{del(e.courseid)}}></i>
                    <Link href={`/course/${e.courseid}`}>
                    <div className="w-full h-60">
                        <img className="pic-1" alt="python" src={`${e.coursepicture}`} width="100%" height="100%"></img>
                    </div>
                    </Link>
                    <Link href={`/course/${e.courseid}`}>
                    <div className="w-full h-40 font-quicksand">
                      <div className="text-navy text-lg box-left my-4 mx-4 h-20">{e.coursename}</div>
                      <div className="text-secondary text-md box-left mx-4">{`${e.firstname}` + " " + `${e.lastname}`}</div>
                      <div className="text-navy text-lg box-left my-1 mx-4">$ {e.price}</div>
                    </div>
                    </Link>
                  </div>
                </span>
              ))}
            </div>
            
            {/* id={item.courseid}
                title={item.coursename}
                key={item.courseid}
                isCompleted={item.isfinished}
                index={index}
                ///
                addtime={item.addtime}
                picture={item.coursepicture}
                ownerF={item.firstname}
                ownerL={item.lastname}
                lastvisit={item.lastvisit} */}


          </div>
        </div>
        <style jsx>{utils}</style>
        <style jsx>
          {`
          .container-1{
            max-width: 87vw;
            min-height: 100vh;
            margin: 0 auto;
            padding: 4rem 1rem;
          }
          .cateBox { 
            border: none;
            outlined: none;
            padding-left: 15px;
            font-size: 0.8rem;
            width: 250px;
          }
          .categoryTab{
			      margin-top: 3rem;
          }
          .bg{
            background: #F9F7FE;
          }
          .mx-search{
            margin-left: 5rem;
            margin-right: 5rem;
      
          }
          .coursecard{
            font-weight: 700;
            font-size: 26px;
            color:#3D467F;
            margin: 30px 30px 30px 40px
          }

          .searchCourse {
            background: white;
            padding-left: 1rem;
            border-radius: 5px;
            display: flex;
            align-items: center;
            flex: 1;
            width: 600px;
            margin-right: 1.5rem;
        }
        .fa-search {
            color: rgba(17, 17, 17, 0.48);
            font-size: 0.8rem;
        }
        .searchBox {
            background: none;
            margin-left: 0.7rem; 
            border: none;
            outlined: none;
            flex: 1;
        }

        `}
        </style>
      </General>
    </Fragment>
  );
};

//////////////////////////////////////////
export default Wishlist
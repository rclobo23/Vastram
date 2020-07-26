import React,  { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import LoadingGifx from './components/Loading-gif2';
import Empty from './components/Empty';
import Loadable from 'react-loadable';
import NavbarContainer from './containers/Navbar-container';
import BasicFooter from './components/BasicFooter';
import './style/transition.css';


const Loading = () => <div style={{height: '1000px',textAlign: 'center', display:'flex', justifyContent:'center',}}><LoadingGifx/></div>;
const Load = () => <div style={{height: '100vh',textAlign: 'center', display:'flex', justifyContent:'center',margin:'40vh 40vw'}}>loading...</div>;
/* 
const ItemContainercom = lazy(() => import('./containers/Item-container'));
const ItemContainer = ()=>
<Suspense fallback={Loading()}>
<ItemContainercom />
</Suspense>

const CheckoutContainercom =  lazy(()=> import('./containers/Checkout-container'));
const CheckoutContainer = ()=>
<Suspense fallback={Loading()}>
<CheckoutContainercom />
</Suspense>


  const CartContainercom =  lazy(() => import('./containers/Cart-container'));
  const CartContainer = ()=>
   <Suspense fallback={Loading()}>
  <CartContainercom />
  </Suspense>

const HomePageComponent = lazy(() => import('./containers/Homepage-container'));
const MainHomePage = () =>
<Suspense fallback={Loading()}>
<HomePageComponent />
</Suspense>


const ItemsListContainercom = lazy(() => import('./containers/Items-list-container'));
  const ItemsListContainer = ()=>
  <Suspense fallback={Loading()}>
  <ItemsListContainercom />
  </Suspense>



  const SubcatsListcom = lazy(() => import('./components/Subcats-list'));
  const SubcatsList = () =>
  <Suspense fallback={Loading()}>
  <SubcatsListcom />
  </Suspense>

const AdminContainercom =  lazy(()=> import('./containers/Admin-container'));
const AdminContainer = () =>
<Suspense fallback={Loading()}>
<AdminContainercom />
</Suspense>

const Secretcom = lazy(() => import('./components/Secret'));
const Secret = () =>
<Suspense fallback={Loading()}>
<Secretcom />
</Suspense>

const Reviewcom = lazy(() => import('./components/review'));
const review = () =>
<Suspense fallback={Loading()}>
<Reviewcom />
</Suspense>

const Ordercom =  lazy(() => import('./components/order'));
const order = () =>
<Suspense fallback={Loading()}>
<Ordercom />
</Suspense> */

const ItemContainer = Loadable({
  loader: () => import('./containers/Item-container'),
  loading: Loading
});

const CheckoutContainer = Loadable({
  loader: () => import('./containers/Checkout-container'),
  loading: Loading
});

const CartContainer = Loadable({
  loader: () => import('./containers/Cart-container'),
  loading: Loading
});

const HomepageContainer = Loadable({
  loader: () => import('./containers/Homepage-container'),
  loading: Loading
});

const ItemsListContainer = Loadable({
  loader: () => import('./containers/Items-list-container'),
  loading: Loading
});

const SubcatsList = Loadable({
  loader: () => import('./components/Subcats-list'),
  loading: Loading
});

const AdminContainer = Loadable({
  loader: () => import('./containers/Admin-container'),
  loading: Loading
});

const Secret = Loadable({
  loader: () => import('./components/Secret'),
  loading: Load
});

const review = Loadable({
  loader: () => import('./components/review'),
  loading: Loading
});

const order = Loadable({
  loader: () => import('./components/order'),
  loading: Loading
});

const Router = () => (
  <div>
    <NavbarContainer />
      <Switch>
        <Route exact path='/' component={HomepageContainer} />
        <Route exact path='/productslist' component={ItemsListContainer} />       
        <Route exact path='/item/:id/:item' component={ItemContainer} />
        <Route exact path='/checkout' component={CheckoutContainer} />
        <Route exact path='/cart' component={CartContainer} />
        <Route exact path='/productslist/:gender' component={ItemsListContainer} />
        <Route exact path='/brand/:brand' component={ItemsListContainer} />
        <Route exact path='/category/:gender' component={SubcatsList} />
        <Route exact path='/admin' component={AdminContainer} />
        <Route exact path='/dashboard' component={Secret} />
        <Route exact path='/dashboard/:id' component={Secret} />
        <Route exact path='/review/' component={review} />
        <Route exact path='/review/:id' component={review} />
        <Route exact path='/order/:pid' component={order} />
        
        <Route component={Empty}/>
      </Switch>
    <BasicFooter />
  </div>
);

export default Router;

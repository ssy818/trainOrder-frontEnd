import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from "@/components/Register";
import Home from "@/components/Home";
import Welcome from "@/components/Welcome";
import Direct from "@/components/Direct";
import Indirect from "@/components/Indirect";
import Buy from "@/components/Buy";
import Time from "@/components/Time";
import Price from "@/components/Price";
import Order from "@/components/Order";
import Change from "@/components/Change";
import Check from "@/components/Check";
import Fix from "@/components/Fix";
import Add from "@/components/Add";

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        {
          path: '/welcome',
          component: Welcome
        },
        {
          path: '/direct-tickets',
          component: Direct
        },
        {
          path: '/indirect-tickets',
          component: Indirect
        },
        {
          path: '/buy-tickets',
          component: Buy
        },
        {
          path: '/timetable',
          component: Time
        },
        {
          path: '/price',
          component: Price
        },
        {
          path: '/myorder',
          component: Order
        },
        {
          path: '/change',
          component: Change
        },
        {
          path: '/info-check',
          component: Check
        },
        {
          path: '/info-fix',
          component: Fix
        },
        {
          path: '/passenger',
          component: Add
        }
      ]
    }
  ]
})

router.beforeEach((to,from,next) => {
  if(to.path ==="/login") return next();
  if(to.path === "/register") return next();
  const token = window.sessionStorage.getItem("user");
  if(!token) return next("/login");
  next();
})

export default router

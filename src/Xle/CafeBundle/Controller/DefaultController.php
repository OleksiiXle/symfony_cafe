<?php

namespace Xle\CafeBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction($coordinates='none')
    {
        //xarkov 50.01529479696636,36.22036609932616
        $r = $_REQUEST;
        $i=1;
      //  return $this->render('XleCafeBundle:Default:index.html.twig');
     //   return $this->render('XleCafeBundle:Default:gmap.html.twig', ['coordinates' => $coordinates]);
        return $this->render('XleCafeBundle:Default:cafe.html.twig', ['coordinates' => $coordinates]);
     //   return $this->render('XleCafeBundle:Default:gmap2.html.twig'); //--- чистый аштимиель
     //   return $this->render('XleCafeBundle:Default:gmap_cafe_search.html.twig');
     //   return $this->render('XleCafeBundle:Default:gmap_search_cafe_near.html.twig');


    }

    public function mapAction()
    {
        return $this->render('XleCafeBundle:Default:gmap.html.twig');
    }
}

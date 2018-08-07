<?php

namespace Xle\CafeBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
      //  return $this->render('XleCafeBundle:Default:index.html.twig');
        return $this->render('XleCafeBundle:Default:gmap.html.twig');

    }

    public function mapAction()
    {
        return $this->render('XleCafeBundle:Default:gmap.html.twig');
    }
}

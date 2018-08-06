<?php

namespace Xle\CafeBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('XleCafeBundle:Default:index.html.twig');
    }
}

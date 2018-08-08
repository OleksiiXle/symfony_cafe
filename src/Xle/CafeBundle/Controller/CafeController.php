<?php

namespace Xle\CafeBundle\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Xle\CafeBundle\Entity\Cafe;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;


/**
 * Cafe controller.
 *
 */
class CafeController extends Controller
{
    /**
     * Lists all cafe entities.
     *
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $cafes = $em->getRepository('XleCafeBundle:Cafe')->findAll();

        return $this->render('cafe/index.html.twig', array(
            'cafes' => $cafes,
        ));
    }

    /**
     * Lists all cafe entities with map.
     *
     */
    public function listAction()
    {
        $em = $this->getDoctrine()->getManager();

        $cafes = $em->getRepository('XleCafeBundle:Cafe')->findAll();

        return $this->render('cafe/list.html.twig', array(
            'cafes' => $cafes,
        ));
    }

    /**
     * ajax send cafe JSON.
     *
     */
    public function infoAction($cafe_id)
    {
        $result = [
            'status' => true,
            'data' => $cafe_id
        ];
        $em = $this->getDoctrine()->getManager();
        $cafe = $em->getRepository(Cafe::class)->find($cafe_id);
        $result['data'] = [
          'id' => $cafe->getId(),
          'google_place_id' => $cafe->getGooglePlaceId(),
          'title' => $cafe->getTitle(),
          'raiting' => $cafe->getRaiting(),
          'review' => $cafe->getReview(),
          'status' => $cafe->getStatus(),
          'address' => $cafe->getAddress(),
          'lat' => $cafe->getLat(),
          'lang' => $cafe->getLng(),
        ];

        /*
        $deleteForm = $this->createDeleteForm($cafe);
        $editForm = $this->createForm('Xle\CafeBundle\Form\CafeType', $cafe);
        $editForm->handleRequest($request);
        return $this->render('cafe/edit.html.twig', array(
            'cafe' => $cafe,
            'edit_form' => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        ));
        */

        return new Response( json_encode($result), 200 );
        return new JsonResponse('Success', 200);
        return json_encode($result);

    }
    /**
     * ajax send cafe update form.
     *
     */
    public function info1Action(Request $request, $cafe_id)
    {
        $em = $this->getDoctrine()->getManager();
        $cafe = $em->getRepository(Cafe::class)->find($cafe_id);
        $editForm = $this->createForm('Xle\CafeBundle\Form\CafeShortType', $cafe);
        $editForm->handleRequest($request);

        return $this->render('cafe/editAjax.html.twig', array(
            'cafe' => $cafe,
            'edit_form' => $editForm->createView(),
        ));
    }

    /**
     * ajax update/delete one cafe, return JSON.
     *
     */
    public function modifyAction(Request $request)
    {
      //  $csrfToken = $client->getContainer()->get('security.csrf.token_manager')->getToken($csrfTokenId);
        $result = [
            'status' => false,
            'data' => ['errors']
        ];
        $cafe_id = $_REQUEST['xle_cafebundle_cafe']['id'];
        $em = $this->getDoctrine()->getManager();
        $cafe = $em->getRepository(Cafe::class)->find($cafe_id);
        $editForm = $this->createForm('Xle\CafeBundle\Form\CafeShortType', $cafe);
        $editForm->handleRequest($request);

        if ($editForm->isValid()) {
            $this->getDoctrine()->getManager()->flush();
            $result = [
                'status' => true,
                'data' => ['OK']
            ];

        } else {
            $result['data'] = $editForm->getErrors();
        }

        /*
        $deleteForm = $this->createDeleteForm($cafe);
        $editForm = $this->createForm('Xle\CafeBundle\Form\CafeType', $cafe);
        $editForm->handleRequest($request);
        return $this->render('cafe/edit.html.twig', array(
            'cafe' => $cafe,
            'edit_form' => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        ));
        */

        return new Response( json_encode($result), 200 );
      //  return new JsonResponse('Success', 200);
     //   return json_encode($result);

    }

    /**
     * Creates a new cafe entity.
     *
     */
    public function newAction(Request $request)
    {
        $cafe = new Cafe();
        $form = $this->createForm('Xle\CafeBundle\Form\CafeType', $cafe);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($cafe);
            $em->flush();

            return $this->redirectToRoute('cmanager_show', array('id' => $cafe->getId()));
        }

        return $this->render('cafe/new.html.twig', array(
            'cafe' => $cafe,
            'form' => $form->createView(),
        ));
    }

    /**
     * Finds and displays a cafe entity.
     *
     */
    public function showAction(Cafe $cafe)
    {
        $deleteForm = $this->createDeleteForm($cafe);

        return $this->render('cafe/show.html.twig', array(
            'cafe' => $cafe,
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Displays a form to edit an existing cafe entity.
     *
     */
    public function editAction(Request $request, Cafe $cafe)
    {
        $deleteForm = $this->createDeleteForm($cafe);
        $editForm = $this->createForm('Xle\CafeBundle\Form\CafeType', $cafe);
        $editForm->handleRequest($request);

        if ($editForm->isSubmitted() && $editForm->isValid()) {
            $this->getDoctrine()->getManager()->flush();

            return $this->redirectToRoute('cmanager_edit', array('id' => $cafe->getId()));
        }

        return $this->render('cafe/edit.html.twig', array(
            'cafe' => $cafe,
            'edit_form' => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        ));
    }



    /**
     * Deletes a cafe entity.
     *
     */
    public function deleteAction(Request $request, Cafe $cafe)
    {
        $form = $this->createDeleteForm($cafe);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($cafe);
            $em->flush();
        }

        return $this->redirectToRoute('cmanager_index');
    }

    /**
     * Creates a form to delete a cafe entity.
     *
     * @param Cafe $cafe The cafe entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm(Cafe $cafe)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('cmanager_delete', array('id' => $cafe->getId())))
            ->setMethod('DELETE')
            ->getForm()
        ;
    }
}

<?php

namespace Xle\CafeBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class CafeShortType extends AbstractType
{
    /**
     * {@inheritdoc}
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('title')
            ->add('raiting', ChoiceType::class, [
                'choices' => [
                    'Не установлен' => 0,
                    'Ни какое' => 1,
                    'Ниже среднего' => 2,
                    'Так-себе' => 3,
                    'Очень даже ничего' => 4,
                    'Фэн-шуй' => 5,
                ],
            ])
            ->add('review', TextareaType::class,[
                'attr' => ['row' => 2, 'col' => 20, ],
                'label' => 'Отзыв'
            ])
            ->add('status', ChoiceType::class, [
                'choices' => [
                    'Отзыва нет' => 0,
                    'Отзыв есть' => 1,
                ],
            ])
            ->add('id', IntegerType::class, [
                'attr' => ['style' => 'display:none;'],
                'label' => false

            ]);


/*
        $builder->add('attending', ChoiceType::class, array(
            'choices' => array(
                new Status(Status::YES),
                new Status(Status::NO),
                new Status(Status::MAYBE),
            ),
            'choice_label' => 'displayName',  // <-- where this is getDisplayName() on the object.
        ));
*/


    }/**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Xle\CafeBundle\Entity\Cafe'
        ));
    }

    /**
     * {@inheritdoc}
     */
    public function getBlockPrefix()
    {
        return 'xle_cafebundle_cafe';
    }


}

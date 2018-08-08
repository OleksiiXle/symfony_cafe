<?php

namespace Xle\CafeBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Cafe
 *
 * @ORM\Table(name="cafe")
 * @ORM\Entity(repositoryClass="Xle\CafeBundle\Repository\CafeRepository")
 */
class Cafe
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="google_place_id", type="string", length=255, nullable=true, unique=true)
     */
    private $googlePlaceId;

    /**
     * @var string
     *
     * @ORM\Column(name="title", type="string", length=255, nullable=true)
     */
    private $title;

    /**
     * @var int
     *
     * @ORM\Column(name="raiting", type="smallint", nullable=true)
     */
    private $raiting;

    /**
     * @var string
     *
     * @ORM\Column(name="review", type="string", length=255, nullable=true)
     */
    private $review;

    /**
     * @var string
     *
     * @ORM\Column(name="address", type="string", length=255, nullable=true)
     */
    private $address;

    /**
     * @var float
     *
     * @ORM\Column(name="lat", type="float", nullable=true)
     */
    private $lat;

    /**
     * @var float
     *
     * @ORM\Column(name="lng", type="float", nullable=true)
     */
    private $lng;

    /**
     * @var int
     *
     * @ORM\Column(name="status", type="smallint", nullable=true)
     */
    private $status;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="createdAt", type="datetime", nullable=true)
     */
    private $createdAt;


    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set googlePlaceId
     *
     * @param string $googlePlaceId
     *
     * @return Cafe
     */
    public function setGooglePlaceId($googlePlaceId)
    {
        $this->googlePlaceId = $googlePlaceId;

        return $this;
    }

    /**
     * Get googlePlaceId
     *
     * @return string
     */
    public function getGooglePlaceId()
    {
        return $this->googlePlaceId;
    }

    /**
     * Set title
     *
     * @param string $title
     *
     * @return Cafe
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get title
     *
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set raiting
     *
     * @param integer $raiting
     *
     * @return Cafe
     */
    public function setRaiting($raiting)
    {
        $this->raiting = $raiting;

        return $this;
    }

    /**
     * Get raiting
     *
     * @return int
     */
    public function getRaiting()
    {
        return $this->raiting;
    }

    /**
     * Set review
     *
     * @param string $review
     *
     * @return Cafe
     */
    public function setReview($review)
    {
        $this->review = $review;

        return $this;
    }

    /**
     * Get review
     *
     * @return string
     */
    public function getReview()
    {
        return $this->review;
    }

    /**
     * Set address
     *
     * @param string $address
     *
     * @return Cafe
     */
    public function setAddress($address)
    {
        $this->address = $address;

        return $this;
    }

    /**
     * Get address
     *
     * @return string
     */
    public function getAddress()
    {
        return $this->address;
    }

    /**
     * Set lat
     *
     * @param float $lat
     *
     * @return Cafe
     */
    public function setLat($lat)
    {
        $this->lat = $lat;

        return $this;
    }

    /**
     * Get lat
     *
     * @return float
     */
    public function getLat()
    {
        return $this->lat;
    }

    /**
     * Set lng
     *
     * @param float $lng
     *
     * @return Cafe
     */
    public function setLng($lng)
    {
        $this->lng = $lng;

        return $this;
    }

    /**
     * Get lng
     *
     * @return float
     */
    public function getLng()
    {
        return $this->lng;
    }

    /**
     * Set status
     *
     * @param integer $status
     *
     * @return Cafe
     */
    public function setStatus($status)
    {
        $this->status = $status;

        return $this;
    }

    /**
     * Get status
     *
     * @return int
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * Set createdAt
     *
     * @param \DateTime $createdAt
     *
     * @return Cafe
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * Get createdAt
     *
     * @return \DateTime
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }
}


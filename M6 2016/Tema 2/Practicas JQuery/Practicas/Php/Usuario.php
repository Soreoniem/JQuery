<?php
namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
/*
	Comentario
	de 
	doble
	línea
*/

// Comentario


/**
 * Usuario
 *
 * @ORM\Table(name="usuario")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\UsuarioRepository")
 * @ORM\HasLifecycleCallbacks()
 */
class Usuarios{
    private $id;
    private $email;
    private $nombre;
    private $password;
    private $creadoAt;
    private $actualizadoAt;

	public function __construct(){
		$this->creadoAt			= new \DateTime();
		$this->actualizadoAt	= $this->creadoAt;
	}
	
    public function getId(){return $this->id;}

    public function setEmail($email){
        $this->email = $email;

        return $this;
    }

    public function getEmail(){
        return $this->email;
    }
    public function setActualizadoAt(){
        $this->actualizadoAt = new \DateTime();

        return $this;
    }

    public function getActualizadoAt(){
        return $this->actualizadoAt;
    }
}


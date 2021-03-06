package spacewar;

import java.util.Random;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import com.fasterxml.jackson.databind.JsonNode;

public class Player extends Spaceship {
//Player es un Wrapper de Spaceship
	private final WebSocketSession session;
	private String playerName="";
	private final int playerId;
	private final String shipType;
	private Room room;	
	//Informacion in-Game (esquina superior izquierda)
	String name="";
	int healthPoints;	//Puntos de vida
	int ammoPoints;		//Cantidad de munición
	int propellerPoints;	//Puntos del propulsor

	public Player(int playerId, WebSocketSession session) {
		this.playerId = playerId;
		this.session = session;
		this.shipType = this.getRandomShipType();
		this.healthPoints=100;
		this.ammoPoints=5;
		this.propellerPoints=0;
		//this.name -> hay que pasarle el nombre introducido por teclado
	}

	public int getPlayerId() {
		return this.playerId;
	}

	public String getPlayerName() {
		return this.playerName;
	}
	
	public WebSocketSession getSession() {
		return this.session;
	}

	public void sendMessage(String msg) throws Exception {
		this.session.sendMessage(new TextMessage(msg));
	}

	public String getShipType() {
		return shipType;
	}

	public Room getRoom() {
		return this.room;
	}
	
	public void setRoom(Room room) {
		this.room = room;
	}
	
	//Algoritmo para generar nave aleatoria
	private String getRandomShipType() {
		String[] randomShips = { "blue", "darkgrey", "green", "metalic", "orange", "purple", "red" };
		String ship = (randomShips[new Random().nextInt(randomShips.length)]);
		ship += "_0" + (new Random().nextInt(5) + 1) + ".png";
		return ship;
	}

	public void exitRoom() {
		room.removePlayerFromRoom(this);
	}

}

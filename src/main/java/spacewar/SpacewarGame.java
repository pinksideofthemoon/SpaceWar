package spacewar;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;
import org.springframework.web.socket.TextMessage;

public class SpacewarGame {

	public final static SpacewarGame INSTANCE = new SpacewarGame();

	public final static boolean DEBUG_MODE = true;
	public final static boolean VERBOSE_MODE = true;

	// GLOBAL GAME ROOM
	private Room room;	//Borrar más adelante
	private int MAX_PLAYERS = 3;	//Solo válido para el Modo Classic
	
	ArrayList<Room> rooms = new ArrayList<>();
	private Map<String, Player> totalPlayers = new ConcurrentHashMap<>();	//Todos los jugadores conectados al servidor
	private AtomicInteger numTotalPlayers = new AtomicInteger();	//Contador de jugadores globales activos
	private AtomicInteger numRooms = new AtomicInteger(0);	//Contador de todas las salas activas

	private SpacewarGame() {

	}

	public void addPlayer(Player player) {		//GESTOR DE JUGADORES 
		totalPlayers.put(player.getSession().getId(), player);

		int countAllPlayers = numTotalPlayers.getAndIncrement();
		if (DEBUG_MODE) 	
			System.out.println("[DEBUG J] Player " + player.getSession().getId() + " se ha conectado al servidor.");
		
		if (countAllPlayers == 0) {	//Si no hay jugadores, creo una sala nueva
			createNewRoom(numRooms, player);
			//this.startGameLoop();
		} else if (countAllPlayers < MAX_PLAYERS) {//Si ya hay jugadores, entro a la sala creada SI NO ESTÁ LLENA
			//TO DO
			//Recorrer el array de rooms y buscar si hay alguna que todavía tenga hueco. Si no hay ninguna con hueco, creamos sala nueva
			joinToExistingRoom(rooms.get(0), player);	//Se une a una única sala que hay de momento (cambiar más adelante)
		} else if (countAllPlayers < MAX_PLAYERS*2){		//Si la sala está llena, creo una nueva
			if (countAllPlayers == MAX_PLAYERS)
				createNewRoom(numRooms, player);
			else {
				joinToExistingRoom(rooms.get(1), player);
			}
		} 
	}
	
	public void createNewRoom(AtomicInteger id, Player player) {
		numRooms.getAndIncrement();
		room = new Room(numRooms, MAX_PLAYERS, this);	//Crea una sala con el numero de jugadores. He borrado el parámetro SpacewarGame (this)
		if (DEBUG_MODE) 	
			System.out.println("[DEBUG J] Room " + room.getId() + " creada por el player ["+ player.getSession().getId() + "]");
		room.addPlayerToRoom(player);			//Añade el anfitrión a la sala
		rooms.add(room);						//Añade la sala a la lista de salas
	}
	
	//TO DO
	public void joinToExistingRoom(Room room, Player player) {	//Debería llevar el parámetro (Room room) también
		room.incrementNumPlayersInRoom();	//Suma 1 al contador de jugadores DE LA SALA
		room.addPlayerToRoom(player);
	}
	
	public Collection<Player> getAllPlayers() {
		return totalPlayers.values();
	}
	
	public void removePlayer(Player player) {
		totalPlayers.remove(player.getSession().getId());

		int count = this.numTotalPlayers.decrementAndGet();
		//if (count == 0) 			//Esto iría en el removePlayer de Room
		//	this.stopGameLoop();
	}
	
	public void addProjectile (Player player) {
		//player.getRoom().addProjectile(id, projectile);
	}
	
	//Recorre todos los jugadores de la ED "Players" para enviarles un mismo mensaje
	public void broadcast(String message) {
		for (Player player : getAllPlayers()) {
			try {
				player.getSession().sendMessage(new TextMessage(message.toString()));
			} catch (Throwable ex) {
				System.err.println("Execption sending message to player " + player.getSession().getId());
				ex.printStackTrace(System.err);
				this.removePlayer(player);
			}
		}
	} 

	public void handleCollision() {

	}
}

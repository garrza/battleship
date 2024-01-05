import elements from "../views/base";
import gameboardView from "../views/gameboardView";

const createDrag = (player, playerBoard) => {
  let draggedShip;
  let draggedShipIndex;

  const getDraggedShipIndex = (e) =>
    (draggedShipIndex = Number(e.target.dataset.index));

  const dragStart = (e) => {
    draggedShip = e.target;
    console.log(draggedShip);
  };
  const dragDrop = (e) => {
    const cell = e.target;
    const playerShip = player.getFleet()[draggedShip.dataset.ship];
    const isHorizontal = playerShip.getDirection() === "horizontal";
    const y = Number(cell.dataset.y) - (isHorizontal ? 0 : draggedShipIndex);
    const x = Number(cell.dataset.x) - (isHorizontal ? draggedShipIndex : 0);

    // place ship and get outcome
    const outcome = playerBoard.placeShip(playerShip, y, x);
    if (outcome) {
      gameboardView.renderGrid(
        elements.playerGrid,
        playerBoard,
        player.getType()
      );
      addDragAndDropEvenListeners();
      draggedShip.parentElement.removeChild(draggedShip);
      // show START button if all ships are placed
      if (playerBoard.areAllShipsPlaced()) {
        elements.startBtn.classList.add("show");
        elements.fleetInfo.classList.add("hide");
        elements.fleetInfo.classList.remove("show");
      }
    }
  };

  const dragOver = (e) => e.preventDefault();
  const dragEnter = (e) => e.preventDefault();
  const dragLeave = () => {};
  const dragEnd = () => {};

  const addDragAndDropEvenListeners = () => {
    const ships = document.querySelectorAll(".ship");
    const cells = elements.playerGrid.childNodes;

    // Add EventListners for drag/drop events
    for (const ship of ships) {
      // EventListener to know which index is being held when dragging
      ship.addEventListener("mousedown", getDraggedShipIndex);
      ship.addEventListener("dragstart", dragStart);
      ship.addEventListener("dragend", dragEnd);
    }
    for (const cell of cells) {
      cell.addEventListener("dragover", dragOver);
      cell.addEventListener("dragenter", dragEnter);
      cell.addEventListener("dragleave", dragLeave);
      cell.addEventListener("drop", dragDrop);
    }
  };

  return { addDragAndDropEvenListeners };
};

export default createDrag;

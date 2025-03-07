import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.util.*;

public class ChessGame extends JFrame {
    public ChessGame() {
        setTitle("Chess Game");
        setDefaultCloseOperation(EXIT_ON_CLOSE);
        setResizable(false);
        ChessPanel panel = new ChessPanel();
        add(panel);
        pack();
        setLocationRelativeTo(null);
        setVisible(true);
    }
    
    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> new ChessGame());
    }
    
    // --- ChessPanel: draws board & pieces, and handles mouse input (clicks & drags) ---
    class ChessPanel extends JPanel implements MouseListener, MouseMotionListener {
        final int TILE_SIZE = 80;
        Board board;
        // For click-selection mode:
        int selectedX = -1, selectedY = -1;
        ArrayList<Move> legalMovesForSelected = null;
        
        // For drag–drop:
        boolean dragging = false;
        int dragFromX = -1, dragFromY = -1; // starting square of drag
        int dragX = 0, dragY = 0;            // current mouse location during drag
        
        public ChessPanel() {
            setPreferredSize(new Dimension(8 * TILE_SIZE, 8 * TILE_SIZE));
            board = new Board();
            board.initBoard();
            addMouseListener(this);
            addMouseMotionListener(this);
        }
        
        @Override
        protected void paintComponent(Graphics g) {
            super.paintComponent(g);
            // Draw board squares
            for (int r = 0; r < 8; r++) {
                for (int c = 0; c < 8; c++) {
                    if ((r + c) % 2 == 0)
                        g.setColor(new Color(240, 217, 181)); // light
                    else
                        g.setColor(new Color(181, 136, 99));   // dark
                    g.fillRect(c * TILE_SIZE, r * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                    
                    // Draw yellow outline on the selected square (if not dragging)
                    if (!dragging && r == selectedY && c == selectedX) {
                        g.setColor(Color.YELLOW);
                        g.drawRect(c * TILE_SIZE, r * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                        g.drawRect(c * TILE_SIZE + 1, r * TILE_SIZE + 1, TILE_SIZE - 2, TILE_SIZE - 2);
                    }
                }
            }
            // Highlight legal moves for the selected piece (if not dragging)
            if (!dragging && legalMovesForSelected != null) {
                g.setColor(new Color(0, 255, 0, 128));
                for (Move m : legalMovesForSelected) {
                    g.fillRect(m.toX * TILE_SIZE, m.toY * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                }
            }
            // Draw pieces (using Unicode symbols)
            g.setFont(new Font("SansSerif", Font.PLAIN, TILE_SIZE));
            for (int r = 0; r < 8; r++) {
                for (int c = 0; c < 8; c++) {
                    Piece p = board.pieces[r][c];
                    // If this piece is currently being dragged, skip drawing it at its original square.
                    if (dragging && r == dragFromY && c == dragFromX)
                        continue;
                    if (p != null) {
                        String symbol = p.getSymbol();
                        if (p.isWhite)
                            g.setColor(Color.WHITE);
                        else
                            g.setColor(Color.BLACK);
                        g.drawString(symbol, c * TILE_SIZE + TILE_SIZE / 4, r * TILE_SIZE + (3 * TILE_SIZE) / 4);
                    }
                }
            }
            // If dragging, draw the dragged piece at the mouse pointer.
            if (dragging) {
                Piece p = board.pieces[dragFromY][dragFromX];
                if (p != null) {
                    String symbol = p.getSymbol();
                    if (p.isWhite)
                        g.setColor(Color.WHITE);
                    else
                        g.setColor(Color.BLACK);
                    g.drawString(symbol, dragX - TILE_SIZE / 2, dragY + TILE_SIZE / 2);
                }
            }
        }
        
        // --- MouseListener and MouseMotionListener methods ---
        @Override
        public void mousePressed(MouseEvent e) {
            int c = e.getX() / TILE_SIZE;
            int r = e.getY() / TILE_SIZE;
            Piece p = board.pieces[r][c];
            // Only allow drag if a white piece is at this square.
            if (p != null && p.isWhite) {
                dragging = true;
                dragFromX = c;
                dragFromY = r;
                dragX = e.getX();
                dragY = e.getY();
                // Also compute legal moves for this piece (for later checking).
                legalMovesForSelected = board.getLegalMovesForPiece(c, r);
                selectedX = c;
                selectedY = r;
            }
        }
        
        @Override
        public void mouseDragged(MouseEvent e) {
            if (dragging) {
                dragX = e.getX();
                dragY = e.getY();
                repaint();
            }
        }
        
        @Override
        public void mouseReleased(MouseEvent e) {
            if (dragging) {
                int c = e.getX() / TILE_SIZE;
                int r = e.getY() / TILE_SIZE;
                // Check if the drop square is a legal destination.
                if (legalMovesForSelected != null) {
                    for (Move m : legalMovesForSelected) {
                        if (m.toX == c && m.toY == r) {
                            board.makeMove(m);
                            break;
                        }
                    }
                }
                dragging = false;
                selectedX = -1;
                selectedY = -1;
                legalMovesForSelected = null;
                repaint();
                
                // After White’s move, check for game end.
                if (board.isGameOver(true)) {
                    JOptionPane.showMessageDialog(this, "Checkmate! Black wins.");
                    return;
                }
                // Now let the computer (Black) move.
                computerMove();
                repaint();
            }
        }
        
        // Also support simple click selection (if not dragging).
        @Override
        public void mouseClicked(MouseEvent e) {
            if (dragging) return; // ignore clicks that are part of a drag.
            int c = e.getX() / TILE_SIZE;
            int r = e.getY() / TILE_SIZE;
            // If a piece is already selected and the clicked square is one of its legal moves…
            if (selectedX != -1 && legalMovesForSelected != null) {
                for (Move m : legalMovesForSelected) {
                    if (m.toX == c && m.toY == r) {
                        board.makeMove(m);
                        selectedX = -1;
                        selectedY = -1;
                        legalMovesForSelected = null;
                        repaint();
                        if (board.isGameOver(true)) {
                            JOptionPane.showMessageDialog(this, "Checkmate! Black wins.");
                            return;
                        }
                        computerMove();
                        repaint();
                        return;
                    }
                }
            }
            // Otherwise, if the clicked square has a white piece, select it.
            Piece p = board.pieces[r][c];
            if (p != null && p.isWhite) {
                selectedX = c;
                selectedY = r;
                legalMovesForSelected = board.getLegalMovesForPiece(c, r);
            } else {
                selectedX = -1;
                selectedY = -1;
                legalMovesForSelected = null;
            }
            repaint();
        }
        
        @Override public void mouseMoved(MouseEvent e) { }
        @Override public void mouseEntered(MouseEvent e) { }
        @Override public void mouseExited(MouseEvent e) { }
        
        // Computer (Black) move using a basic minimax search.
        public void computerMove() {
            ArrayList<Move> moves = board.getAllLegalMoves(false);
            if (moves.isEmpty()) {
                if (board.isGameOver(false))
                    JOptionPane.showMessageDialog(this, "Checkmate! White wins.");
                else
                    JOptionPane.showMessageDialog(this, "Stalemate!");
                return;
            }
            // Use minimax search (depth 3) for basic lookahead.
            Move best = board.getBestMove(false, 3);
            if (best == null) {
                // Fallback in case minimax fails.
                best = moves.get(new Random().nextInt(moves.size()));
            }
            board.makeMove(best);
            if (board.isGameOver(false))
                JOptionPane.showMessageDialog(this, "Checkmate! White wins.");
        }
    }
    
    // --- Board class: holds state, generates moves, and now includes evaluation & minimax ---
    class Board {
        // Board is an 8x8 array. Row 0 is top.
        Piece[][] pieces = new Piece[8][8];
        // En passant target square (if any); if none, these are -1.
        int enPassantX = -1, enPassantY = -1;
        
        public void initBoard() {
            // Clear board
            for (int r = 0; r < 8; r++)
                for (int c = 0; c < 8; c++)
                    pieces[r][c] = null;
            // Black pieces
            pieces[0][0] = new Piece(PieceType.ROOK, false);
            pieces[0][1] = new Piece(PieceType.KNIGHT, false);
            pieces[0][2] = new Piece(PieceType.BISHOP, false);
            pieces[0][3] = new Piece(PieceType.QUEEN, false);
            pieces[0][4] = new Piece(PieceType.KING, false);
            pieces[0][5] = new Piece(PieceType.BISHOP, false);
            pieces[0][6] = new Piece(PieceType.KNIGHT, false);
            pieces[0][7] = new Piece(PieceType.ROOK, false);
            for (int c = 0; c < 8; c++)
                pieces[1][c] = new Piece(PieceType.PAWN, false);
            // White pieces
            pieces[7][0] = new Piece(PieceType.ROOK, true);
            pieces[7][1] = new Piece(PieceType.KNIGHT, true);
            pieces[7][2] = new Piece(PieceType.BISHOP, true);
            pieces[7][3] = new Piece(PieceType.QUEEN, true);
            pieces[7][4] = new Piece(PieceType.KING, true);
            pieces[7][5] = new Piece(PieceType.BISHOP, true);
            pieces[7][6] = new Piece(PieceType.KNIGHT, true);
            pieces[7][7] = new Piece(PieceType.ROOK, true);
            for (int c = 0; c < 8; c++)
                pieces[6][c] = new Piece(PieceType.PAWN, true);
        }
        
        // Execute a move and update special state.
        public void makeMove(Move m) {
            Piece p = pieces[m.fromY][m.fromX];
            // Handle en passant capture.
            if (p.type == PieceType.PAWN && m.toX == enPassantX && m.toY == enPassantY) {
                int captureRow = p.isWhite ? m.toY + 1 : m.toY - 1;
                pieces[captureRow][m.toX] = null;
            }
            // Handle castling.
            if (p.type == PieceType.KING && Math.abs(m.toX - m.fromX) == 2) {
                if (m.toX == 6) { // kingside
                    Piece rook = pieces[m.fromY][7];
                    pieces[m.fromY][5] = rook;
                    pieces[m.fromY][7] = null;
                    rook.hasMoved = true;
                } else if (m.toX == 2) { // queenside
                    Piece rook = pieces[m.fromY][0];
                    pieces[m.fromY][3] = rook;
                    pieces[m.fromY][0] = null;
                    rook.hasMoved = true;
                }
            }
            // Move the piece.
            pieces[m.toY][m.toX] = p;
            pieces[m.fromY][m.fromX] = null;
            p.hasMoved = true;
            // Pawn promotion: auto-promote to queen.
            if (p.type == PieceType.PAWN) {
                if ((p.isWhite && m.toY == 0) || (!p.isWhite && m.toY == 7)) {
                    p.type = PieceType.QUEEN;
                }
                // Set en passant target if moved two squares.
                if (Math.abs(m.toY - m.fromY) == 2) {
                    enPassantX = m.fromX;
                    enPassantY = (m.fromY + m.toY) / 2;
                } else {
                    enPassantX = -1;
                    enPassantY = -1;
                }
            } else {
                enPassantX = -1;
                enPassantY = -1;
            }
        }
        
        // Generate legal moves for the piece at (x, y).
        public ArrayList<Move> getLegalMovesForPiece(int x, int y) {
            ArrayList<Move> moves = new ArrayList<>();
            Piece p = pieces[y][x];
            if (p == null)
                return moves;
            switch (p.type) {
                case PAWN:
                    moves.addAll(getPawnMoves(x, y, p));
                    break;
                case KNIGHT:
                    moves.addAll(getKnightMoves(x, y, p));
                    break;
                case BISHOP:
                    moves.addAll(getSlidingMoves(x, y, p, new int[][] { {1,1}, {1,-1}, {-1,1}, {-1,-1} }));
                    break;
                case ROOK:
                    moves.addAll(getSlidingMoves(x, y, p, new int[][] { {1,0}, {-1,0}, {0,1}, {0,-1} }));
                    break;
                case QUEEN:
                    moves.addAll(getSlidingMoves(x, y, p, new int[][] { {1,0}, {-1,0}, {0,1}, {0,-1}, {1,1}, {1,-1}, {-1,1}, {-1,-1} }));
                    break;
                case KING:
                    moves.addAll(getKingMoves(x, y, p));
                    break;
            }
            // Remove moves that leave own king in check.
            ArrayList<Move> legal = new ArrayList<>();
            for (Move m : moves) {
                Board copy = this.copy();
                copy.makeMove(m);
                if (!copy.isInCheck(p.isWhite))
                    legal.add(m);
            }
            return legal;
        }
        
        // Get all legal moves for the given color.
        public ArrayList<Move> getAllLegalMoves(boolean white) {
            ArrayList<Move> moves = new ArrayList<>();
            for (int r = 0; r < 8; r++) {
                for (int c = 0; c < 8; c++) {
                    Piece p = pieces[r][c];
                    if (p != null && p.isWhite == white) {
                        moves.addAll(getLegalMovesForPiece(c, r));
                    }
                }
            }
            return moves;
        }
        
        // Check if the king of given color is in check.
        public boolean isInCheck(boolean white) {
            int kingX = -1, kingY = -1;
            for (int r = 0; r < 8; r++) {
                for (int c = 0; c < 8; c++) {
                    Piece p = pieces[r][c];
                    if (p != null && p.type == PieceType.KING && p.isWhite == white) {
                        kingX = c;
                        kingY = r;
                    }
                }
            }
            return squareAttacked(kingX, kingY, !white);
        }
        
        // Returns true if square (x, y) is attacked by any piece of given color.
        public boolean squareAttacked(int x, int y, boolean byWhite) {
            for (int r = 0; r < 8; r++) {
                for (int c = 0; c < 8; c++) {
                    Piece p = pieces[r][c];
                    if (p != null && p.isWhite == byWhite) {
                        ArrayList<Move> moves = getPseudoLegalMoves(c, r, p);
                        for (Move m : moves) {
                            if (m.toX == x && m.toY == y)
                                return true;
                        }
                    }
                }
            }
            return false;
        }
        
        // A game is over if there are no legal moves for that color.
        public boolean isGameOver(boolean white) {
            return getAllLegalMoves(white).isEmpty();
        }
        
        // Generate pseudo-legal moves (ignoring king safety) for piece at (x, y).
        public ArrayList<Move> getPseudoLegalMoves(int x, int y, Piece p) {
            ArrayList<Move> moves = new ArrayList<>();
            switch (p.type) {
                case PAWN:
                    moves.addAll(getPawnMoves(x, y, p));
                    break;
                case KNIGHT:
                    moves.addAll(getKnightMoves(x, y, p));
                    break;
                case BISHOP:
                    moves.addAll(getSlidingMoves(x, y, p, new int[][] { {1,1}, {1,-1}, {-1,1}, {-1,-1} }));
                    break;
                case ROOK:
                    moves.addAll(getSlidingMoves(x, y, p, new int[][] { {1,0}, {-1,0}, {0,1}, {0,-1} }));
                    break;
                case QUEEN:
                    moves.addAll(getSlidingMoves(x, y, p, new int[][] { {1,0}, {-1,0}, {0,1}, {0,-1}, {1,1}, {1,-1}, {-1,1}, {-1,-1} }));
                    break;
                case KING:
                    moves.addAll(getKingMoves(x, y, p));
                    break;
            }
            return moves;
        }
        
        // Helper for sliding moves (bishop, rook, queen).
        public ArrayList<Move> getSlidingMoves(int x, int y, Piece p, int[][] directions) {
            ArrayList<Move> moves = new ArrayList<>();
            for (int[] d : directions) {
                int dx = d[0], dy = d[1];
                int nx = x + dx, ny = y + dy;
                while (nx >= 0 && nx < 8 && ny >= 0 && ny < 8) {
                    if (pieces[ny][nx] == null) {
                        moves.add(new Move(x, y, nx, ny));
                    } else {
                        if (pieces[ny][nx].isWhite != p.isWhite)
                            moves.add(new Move(x, y, nx, ny));
                        break;
                    }
                    nx += dx;
                    ny += dy;
                }
            }
            return moves;
        }
        
        // Pawn moves: forward, double step, captures, and en passant.
        public ArrayList<Move> getPawnMoves(int x, int y, Piece p) {
            ArrayList<Move> moves = new ArrayList<>();
            int dir = p.isWhite ? -1 : 1;
            int startRow = p.isWhite ? 6 : 1;
            int ny = y + dir;
            if (ny >= 0 && ny < 8 && pieces[ny][x] == null) {
                moves.add(new Move(x, y, x, ny));
                if (y == startRow && pieces[ny + dir][x] == null)
                    moves.add(new Move(x, y, x, ny + dir));
            }
            for (int dx = -1; dx <= 1; dx += 2) {
                int nx = x + dx;
                if (nx >= 0 && nx < 8 && ny >= 0 && ny < 8) {
                    if (pieces[ny][nx] != null && pieces[ny][nx].isWhite != p.isWhite)
                        moves.add(new Move(x, y, nx, ny));
                    if (ny == enPassantY && nx == enPassantX)
                        moves.add(new Move(x, y, nx, ny));
                }
            }
            return moves;
        }
        
        // Knight moves.
        public ArrayList<Move> getKnightMoves(int x, int y, Piece p) {
            ArrayList<Move> moves = new ArrayList<>();
            int[][] offsets = { {1,2}, {2,1}, {-1,2}, {-2,1}, {1,-2}, {2,-1}, {-1,-2}, {-2,-1} };
            for (int[] o : offsets) {
                int nx = x + o[0], ny = y + o[1];
                if (nx >= 0 && nx < 8 && ny >= 0 && ny < 8) {
                    if (pieces[ny][nx] == null || pieces[ny][nx].isWhite != p.isWhite)
                        moves.add(new Move(x, y, nx, ny));
                }
            }
            return moves;
        }
        
        // King moves including castling.
        public ArrayList<Move> getKingMoves(int x, int y, Piece p) {
            ArrayList<Move> moves = new ArrayList<>();
            for (int dx = -1; dx <= 1; dx++) {
                for (int dy = -1; dy <= 1; dy++) {
                    if (dx == 0 && dy == 0) continue;
                    int nx = x + dx, ny = y + dy;
                    if (nx >= 0 && nx < 8 && ny >= 0 && ny < 8) {
                        if (pieces[ny][nx] == null || pieces[ny][nx].isWhite != p.isWhite)
                            moves.add(new Move(x, y, nx, ny));
                    }
                }
            }
            // Castling.
            if (!p.hasMoved && !isInCheck(p.isWhite)) {
                // Kingside.
                if (pieces[y][x + 1] == null && pieces[y][x + 2] == null) {
                    Piece rook = pieces[y][7];
                    if (rook != null && rook.type == PieceType.ROOK && !rook.hasMoved) {
                        if (!squareAttacked(x + 1, y, !p.isWhite) && !squareAttacked(x + 2, y, !p.isWhite))
                            moves.add(new Move(x, y, x + 2, y));
                    }
                }
                // Queenside.
                if (pieces[y][x - 1] == null && pieces[y][x - 2] == null && pieces[y][x - 3] == null) {
                    Piece rook = pieces[y][0];
                    if (rook != null && rook.type == PieceType.ROOK && !rook.hasMoved) {
                        if (!squareAttacked(x - 1, y, !p.isWhite) && !squareAttacked(x - 2, y, !p.isWhite))
                            moves.add(new Move(x, y, x - 2, y));
                    }
                }
            }
            return moves;
        }
        
        // Create a deep copy of this board.
        public Board copy() {
            Board b = new Board();
            for (int r = 0; r < 8; r++) {
                for (int c = 0; c < 8; c++) {
                    if (this.pieces[r][c] != null)
                        b.pieces[r][c] = this.pieces[r][c].copy();
                    else
                        b.pieces[r][c] = null;
                }
            }
            b.enPassantX = this.enPassantX;
            b.enPassantY = this.enPassantY;
            return b;
        }
        
        // --- Evaluation & Minimax for the computer opponent ---
        public double evaluate() {
            double score = 0;
            for (int r = 0; r < 8; r++) {
                for (int c = 0; c < 8; c++) {
                    Piece p = pieces[r][c];
                    if (p != null) {
                        double val = getPieceValue(p);
                        score += p.isWhite ? val : -val;
                    }
                }
            }
            return score;
        }
        
        private double getPieceValue(Piece p) {
            switch(p.type) {
                case PAWN: return 100;
                case KNIGHT: return 320;
                case BISHOP: return 330;
                case ROOK: return 500;
                case QUEEN: return 900;
                case KING: return 20000;
            }
            return 0;
        }
        
        public double minimax(int depth, double alpha, double beta, boolean maximizingPlayer) {
            // Terminal condition: depth 0 or no moves available.
            boolean whiteTurn = maximizingPlayer;
            if (depth == 0 || getAllLegalMoves(whiteTurn).isEmpty()) {
                return evaluate();
            }
            if (maximizingPlayer) {
                double maxEval = -Double.MAX_VALUE;
                ArrayList<Move> moves = getAllLegalMoves(true);
                for (Move m : moves) {
                    Board newBoard = copy();
                    newBoard.makeMove(m);
                    double eval = newBoard.minimax(depth - 1, alpha, beta, false);
                    maxEval = Math.max(maxEval, eval);
                    alpha = Math.max(alpha, eval);
                    if (beta <= alpha)
                        break;
                }
                return maxEval;
            } else {
                double minEval = Double.MAX_VALUE;
                ArrayList<Move> moves = getAllLegalMoves(false);
                for (Move m : moves) {
                    Board newBoard = copy();
                    newBoard.makeMove(m);
                    double eval = newBoard.minimax(depth - 1, alpha, beta, true);
                    minEval = Math.min(minEval, eval);
                    beta = Math.min(beta, eval);
                    if (beta <= alpha)
                        break;
                }
                return minEval;
            }
        }
        
        public Move getBestMove(boolean white, int depth) {
            ArrayList<Move> moves = getAllLegalMoves(white);
            Move bestMove = null;
            if (white) {
                double bestEval = -Double.MAX_VALUE;
                for (Move m : moves) {
                    Board newBoard = copy();
                    newBoard.makeMove(m);
                    double eval = newBoard.minimax(depth - 1, -Double.MAX_VALUE, Double.MAX_VALUE, false);
                    if (eval > bestEval) {
                        bestEval = eval;
                        bestMove = m;
                    }
                }
            } else {
                double bestEval = Double.MAX_VALUE;
                for (Move m : moves) {
                    Board newBoard = copy();
                    newBoard.makeMove(m);
                    double eval = newBoard.minimax(depth - 1, -Double.MAX_VALUE, Double.MAX_VALUE, true);
                    if (eval < bestEval) {
                        bestEval = eval;
                        bestMove = m;
                    }
                }
            }
            return bestMove;
        }
    }
    
    // --- Piece, PieceType, and Move classes ---
    enum PieceType {
        KING, QUEEN, ROOK, BISHOP, KNIGHT, PAWN;
    }
    
    class Piece {
        PieceType type;
        boolean isWhite;
        boolean hasMoved;
        
        public Piece(PieceType type, boolean isWhite) {
            this.type = type;
            this.isWhite = isWhite;
            this.hasMoved = false;
        }
        
        public Piece copy() {
            Piece p = new Piece(this.type, this.isWhite);
            p.hasMoved = this.hasMoved;
            return p;
        }
        
        public String getSymbol() {
            switch (type) {
                case KING:   return isWhite ? "\u2654" : "\u265A";
                case QUEEN:  return isWhite ? "\u2655" : "\u265B";
                case ROOK:   return isWhite ? "\u2656" : "\u265C";
                case BISHOP: return isWhite ? "\u2657" : "\u265D";
                case KNIGHT: return isWhite ? "\u2658" : "\u265E";
                case PAWN:   return isWhite ? "\u2659" : "\u265F";
            }
            return "";
        }
    }
    
    class Move {
        int fromX, fromY, toX, toY;
        public Move(int fromX, int fromY, int toX, int toY) {
            this.fromX = fromX;
            this.fromY = fromY;
            this.toX = toX;
            this.toY = toY;
        }
    }
}

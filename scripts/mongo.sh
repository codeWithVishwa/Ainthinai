#!/usr/bin/env bash
# Local MongoDB for development.
#
# Runs as a SINGLE-NODE REPLICA SET, not a standalone. That is deliberate:
# multi-document transactions — which the booking flow uses to prevent
# overbooking — are rejected by a standalone mongod. Atlas is always a replica
# set, so this also matches production.
#
#   ./scripts/mongo.sh start | stop | status
set -euo pipefail

DB_ROOT="${MONGO_DB_ROOT:-$HOME/.local/share/mongodb-ainthinai}"
DATA="$DB_ROOT/data"
LOG="$DB_ROOT/mongod.log"
PORT="${MONGO_PORT:-27017}"

start() {
  mkdir -p "$DATA"
  if ss -tln 2>/dev/null | grep -q ":$PORT "; then
    echo "mongod already listening on $PORT"
    return 0
  fi

  mongod --dbpath "$DATA" --port "$PORT" --bind_ip 127.0.0.1 \
         --replSet rs0 --logpath "$LOG" --logappend --fork

  # First run only: bring the replica set up.
  if ! mongosh --quiet --port "$PORT" --eval 'rs.status().ok' >/dev/null 2>&1; then
    mongosh --quiet --port "$PORT" --eval \
      "rs.initiate({_id:'rs0', members:[{_id:0, host:'127.0.0.1:$PORT'}]})" >/dev/null
    sleep 5
  fi

  mongosh --quiet --port "$PORT" --eval \
    'print("mongod " + db.version() + " — " + rs.status().members[0].stateStr)'
}

stop() {
  mongosh --quiet --port "$PORT" --eval 'db.getSiblingDB("admin").shutdownServer()' >/dev/null 2>&1 || true
  sleep 2
  echo "stopped"
}

status() {
  if ss -tln 2>/dev/null | grep -q ":$PORT "; then
    mongosh --quiet --port "$PORT" --eval \
      'print("up — " + db.version() + " — " + rs.status().members[0].stateStr)'
  else
    echo "down"
  fi
}

case "${1:-status}" in
  start) start ;;
  stop) stop ;;
  status) status ;;
  *) echo "usage: $0 {start|stop|status}" >&2; exit 1 ;;
esac

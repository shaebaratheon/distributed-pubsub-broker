# distributed-pubsub-broker

Distributed pub-sub event broker with partition consumer groups and backpressure streaming in TypeScript.

## Architecture & Design

This project implements a high-reliability distributed architecture designed for production workloads.
### Core Components
- `topic_partition`: Core subsystem handling specific domain logic, invariants, and performance guarantees.
- `consumer_group`: Core subsystem handling specific domain logic, invariants, and performance guarantees.
- `offset_manager`: Core subsystem handling specific domain logic, invariants, and performance guarantees.
- `message_serializer`: Core subsystem handling specific domain logic, invariants, and performance guarantees.
- `rebalance_protocol`: Core subsystem handling specific domain logic, invariants, and performance guarantees.
- `disk_commit_log`: Core subsystem handling specific domain logic, invariants, and performance guarantees.

## Testing and Verification

Run the test suite via standard tooling.

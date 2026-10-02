const TREE = {
  "name": "CS layer tree",
  "goal": "Own every layer of abstraction: given any program, descend any layer on demand with the right tool, and come back with an answer.",
  "method": "Probe the node. On a miss, descend one ring. Teach from known material. Quiz. Write the row. The tree grows only at the frontier.",
  "statuses": {
    "passed": "Probed and answered correctly. Parent unlocks its children.",
    "open": "The single node being worked right now.",
    "parked": "Written down and deliberately not now. A decision, not a drift.",
    "locked": "Parent has not passed yet."
  },
  "layers": [
    {
      "id": "L0",
      "name": "Machine model",
      "goal": "How a program becomes a running machine.",
      "spine": "Frame of Essence, Crash Course CS episodes 4-8 (parked), Ben Eater, Tom Scott, CS:APP chapters 2 and 3.",
      "nodes": [
        {
          "id": "L0.1",
          "name": "Bits and numbers",
          "probe": "Convert -3 to 8-bit two's complement. Why is minus one all ones?",
          "source": "CS:APP ch2",
          "status": "passed"
        },
        {
          "id": "L0.2",
          "name": "Memory as numbered boxes",
          "probe": "What is an address, and who decides the numbers?",
          "source": "Frame of Essence, How do computers read code?",
          "status": "passed"
        },
        {
          "id": "L0.3",
          "name": "Machine code and opcodes",
          "probe": "What is an instruction made of, and where does the meaning live?",
          "source": "Frame of Essence, How do computers read code?",
          "status": "passed"
        },
        {
          "id": "L0.4",
          "name": "Instruction decoding as control signals",
          "probe": "How does a 4-bit opcode turn into one control wire, and what does that wire switch on?",
          "source": "Ben Eater, 8-bit CPU control logic part 1",
          "status": "open"
        },
        {
          "id": "L0.5",
          "name": "The program counter and the fetch cycle",
          "probe": "Where is the address of the next instruction kept, and what can change it?",
          "source": "Tom Scott, The Fetch-Execute Cycle",
          "status": "parked"
        },
        {
          "id": "L0.6",
          "name": "Registers, the ALU, and the datapath",
          "probe": "Trace an add of two values from memory through registers and the ALU and back.",
          "source": "Ben Eater, ALU and registers episodes",
          "status": "locked"
        },
        {
          "id": "L0.7",
          "name": "The clock and instruction cycles",
          "probe": "Why does a CPU need a clock, and what happens on an edge?",
          "source": "Ben Eater, clock episodes",
          "status": "locked"
        },
        {
          "id": "L0.8",
          "name": "The stack and function calls",
          "probe": "What exactly gets pushed on a call, and what does recursion exhaust?",
          "source": "Frame of Essence, How do computers read code?",
          "status": "passed"
        },
        {
          "id": "L0.9",
          "name": "Executables and the loader",
          "probe": "What turns a file on disk into a running process with an address space?",
          "source": "CS:APP ch7 and ch8",
          "status": "locked"
        }
      ]
    },
    {
      "id": "L1",
      "name": "C",
      "goal": "Talk to the machine in its own language, with no runtime hiding the details.",
      "spine": "Beej's Guide to C, then CS:APP chapters 2 and 3. Modern C by Gustedt as a reference.",
      "nodes": [
        {
          "id": "L1.1",
          "name": "The compilation model",
          "probe": "Name the stages from source to executable and what each takes and produces.",
          "source": "Beej's Guide to C, intro",
          "status": "locked"
        },
        {
          "id": "L1.2",
          "name": "Types, sizes, and representations",
          "probe": "Why does a signed char overflow to a negative number, and what does unsigned buy?",
          "source": "CS:APP ch2",
          "status": "locked"
        },
        {
          "id": "L1.3",
          "name": "Pointers",
          "probe": "What does p+1 add for an int pointer versus a char pointer?",
          "source": "Beej's Guide to C, pointers",
          "status": "locked"
        },
        {
          "id": "L1.4",
          "name": "Arrays and strings",
          "probe": "Why does an array become a pointer in a function, and where does the length go?",
          "source": "Beej's Guide to C, arrays",
          "status": "locked"
        },
        {
          "id": "L1.5",
          "name": "Structs, padding, and alignment",
          "probe": "Why is the size of a struct with a char and an int not 5?",
          "source": "CS:APP ch3",
          "status": "locked"
        },
        {
          "id": "L1.6",
          "name": "The memory regions of a process",
          "probe": "Point at where locals, globals, string literals, and allocated data live.",
          "source": "CS:APP ch9",
          "status": "locked"
        },
        {
          "id": "L1.7",
          "name": "Allocation and freedom",
          "probe": "What does free actually do with the bytes, and why is use after free undefined?",
          "source": "Beej's Guide to C, manual memory",
          "status": "locked"
        },
        {
          "id": "L1.8",
          "name": "Undefined behavior and the optimizer",
          "probe": "Why can x plus one be less than x for signed int at -O2?",
          "source": "CS:APP ch3 and the C standard",
          "status": "locked"
        },
        {
          "id": "L1.9",
          "name": "Function pointers",
          "probe": "How does a callback work at the machine level?",
          "source": "Beej's Guide to C, function pointers",
          "status": "locked"
        },
        {
          "id": "L1.10",
          "name": "System calls from C",
          "probe": "What does write do that printf does not?",
          "source": "OSTEP ch2-4, The Linux Programming Interface",
          "status": "locked"
        },
        {
          "id": "L1.11",
          "name": "Errors and errno",
          "probe": "What does a syscall return on failure, and where does the reason live?",
          "source": "The Linux Programming Interface ch3",
          "status": "locked"
        },
        {
          "id": "L1.12",
          "name": "Bit tricks and type punning",
          "probe": "How do you read the four bytes of a float as an integer?",
          "source": "CS:APP ch2",
          "status": "locked"
        },
        {
          "id": "L1.13",
          "name": "The preprocessor",
          "probe": "A macro has no type checking. What breaks first?",
          "source": "Modern C ch9",
          "status": "locked"
        },
        {
          "id": "L1.14",
          "name": "Headers, make, and libraries",
          "probe": "Why does the compiler need a header while the linker needs a library?",
          "source": "CS:APP ch7",
          "status": "locked"
        }
      ]
    },
    {
      "id": "L2",
      "name": "Assembly reading",
      "goal": "Read the machine's actual language and map it back to source.",
      "spine": "CS:APP ch3, godbolt.org, gdb. Matt Godbolt's CppCon talk as the tour.",
      "nodes": [
        {
          "id": "L2.1",
          "name": "Registers of x86-64",
          "probe": "Name the six argument registers and the return register.",
          "source": "CS:APP ch3",
          "status": "locked"
        },
        {
          "id": "L2.2",
          "name": "The instruction vocabulary",
          "probe": "What do mov, lea, cmp, test, jcc, call, and ret do?",
          "source": "CS:APP ch3",
          "status": "locked"
        },
        {
          "id": "L2.3",
          "name": "Addressing modes",
          "probe": "Decode a memory operand of base plus index times scale plus displacement.",
          "source": "CS:APP ch3",
          "status": "locked"
        },
        {
          "id": "L2.4",
          "name": "The calling convention",
          "probe": "Where does argument seven go, and where does the return value go?",
          "source": "CS:APP ch3",
          "status": "locked"
        },
        {
          "id": "L2.5",
          "name": "Stack frames",
          "probe": "Walk the frame pointer and stack pointer through a prologue and epilogue. How is the chain built?",
          "source": "CS:APP ch3",
          "status": "locked"
        },
        {
          "id": "L2.6",
          "name": "Flags and conditional jumps",
          "probe": "Which flag is for signed comparison, and which for unsigned?",
          "source": "CS:APP ch3",
          "status": "locked"
        },
        {
          "id": "L2.7",
          "name": "Compiler Explorer practice",
          "probe": "Switch -O0 to -O2 and explain every difference in the output.",
          "source": "godbolt.org",
          "status": "locked"
        },
        {
          "id": "L2.8",
          "name": "Optimization levels",
          "probe": "Why did your function disappear at -O2?",
          "source": "godbolt.org",
          "status": "locked"
        },
        {
          "id": "L2.9",
          "name": "Disassembly tools",
          "probe": "Find a function's address and bytes in objdump and again in gdb.",
          "source": "gdb and binutils docs",
          "status": "locked"
        },
        {
          "id": "L2.10",
          "name": "Position-independent code and the PLT",
          "probe": "Why does a call go to a stub instead of straight to the function?",
          "source": "CS:APP ch7",
          "status": "locked"
        },
        {
          "id": "L2.11",
          "name": "ARM64 for contrast",
          "probe": "How does ARM64 pass arguments and return values?",
          "source": "ARM Architecture Reference Manual, intro",
          "status": "locked"
        }
      ]
    },
    {
      "id": "L3",
      "name": "Toolchain, linking, and loading",
      "goal": "Follow a compiled file from object code to a running process.",
      "spine": "CS:APP ch7, Levine's Linkers and Loaders, Ian Lance Taylor's linker series.",
      "nodes": [
        {
          "id": "L3.1",
          "name": "Object files and sections",
          "probe": "List the sections and what lives in each.",
          "source": "CS:APP ch7",
          "status": "locked"
        },
        {
          "id": "L3.2",
          "name": "Symbols",
          "probe": "What is the difference between a static function, a weak symbol, and an undefined one?",
          "source": "CS:APP ch7",
          "status": "locked"
        },
        {
          "id": "L3.3",
          "name": "Relocations",
          "probe": "Why does the compiler leave holes in the instruction stream?",
          "source": "Levine, Linkers and Loaders",
          "status": "locked"
        },
        {
          "id": "L3.4",
          "name": "Static libraries",
          "probe": "What is a dot a file, and why does link order matter?",
          "source": "CS:APP ch7",
          "status": "locked"
        },
        {
          "id": "L3.5",
          "name": "Shared libraries",
          "probe": "What is a soname, and why can upgrading one break a binary?",
          "source": "Levine, Linkers and Loaders",
          "status": "locked"
        },
        {
          "id": "L3.6",
          "name": "The ELF format",
          "probe": "Walk from the ELF header to the entry point.",
          "source": "ELF spec, man elf",
          "status": "locked"
        },
        {
          "id": "L3.7",
          "name": "The loader",
          "probe": "Who maps the segments, and where does the first instruction come from?",
          "source": "CS:APP ch7 and ch8",
          "status": "locked"
        },
        {
          "id": "L3.8",
          "name": "Virtual address space, PIE, and ASLR",
          "probe": "Why is main at a different address on every run?",
          "source": "CS:APP ch9",
          "status": "locked"
        },
        {
          "id": "L3.9",
          "name": "Lazy binding at runtime",
          "probe": "When is the GOT filled in, and what does LD_DEBUG show?",
          "source": "man ld.so, Levine",
          "status": "locked"
        },
        {
          "id": "L3.10",
          "name": "Debug info",
          "probe": "What does -g add to the file, and how does gdb use it?",
          "source": "DWARF intro, man gdb",
          "status": "locked"
        },
        {
          "id": "L3.11",
          "name": "Sanitizers",
          "probe": "How does AddressSanitizer know a pointer is stale?",
          "source": "ASan design docs",
          "status": "locked"
        }
      ]
    },
    {
      "id": "L4",
      "name": "Compilers",
      "goal": "Turn text into machine code, and understand every step in between.",
      "spine": "Crafting Interpreters, chibicc, the LLVM Kaleidoscope tutorial.",
      "nodes": [
        {
          "id": "L4.1",
          "name": "The pipeline",
          "probe": "Name the stages and one artifact of each.",
          "source": "Crafting Interpreters ch1",
          "status": "locked"
        },
        {
          "id": "L4.2",
          "name": "Lexing",
          "probe": "Tokenize x equals a plus plus plus b and justify the choices.",
          "source": "Crafting Interpreters part 2",
          "status": "locked"
        },
        {
          "id": "L4.3",
          "name": "Parsing",
          "probe": "Parse an expression with precedence and associativity into a tree.",
          "source": "Crafting Interpreters part 2",
          "status": "locked"
        },
        {
          "id": "L4.4",
          "name": "Semantic analysis",
          "probe": "What is a symbol table, and when is it built?",
          "source": "Crafting Interpreters part 2",
          "status": "locked"
        },
        {
          "id": "L4.5",
          "name": "IR and SSA",
          "probe": "Translate a small if into three-address code, then into SSA.",
          "source": "Engineering a Compiler ch5",
          "status": "locked"
        },
        {
          "id": "L4.6",
          "name": "Optimization passes",
          "probe": "Explain constant folding, dead code elimination, inlining, and loop-invariant motion.",
          "source": "Engineering a Compiler ch8",
          "status": "locked"
        },
        {
          "id": "L4.7",
          "name": "Instruction selection and register allocation",
          "probe": "Why do compilers spill registers to the stack?",
          "source": "Engineering a Compiler ch11",
          "status": "locked"
        },
        {
          "id": "L4.8",
          "name": "Dataflow analysis",
          "probe": "What does liveness mean, and how is it computed?",
          "source": "Engineering a Compiler ch9",
          "status": "locked"
        },
        {
          "id": "L4.9",
          "name": "LLVM",
          "probe": "Read the IR for a small function and name the pass that transformed it.",
          "source": "LLVM Kaleidoscope tutorial",
          "status": "locked"
        },
        {
          "id": "L4.10",
          "name": "Write a small compiler",
          "probe": "Does your compiler turn recursive fib into working assembly?",
          "source": "chibicc, or Crafting Interpreters part 3",
          "status": "locked"
        },
        {
          "id": "L4.11",
          "name": "Interpreters versus compilers",
          "probe": "Why is an interpreter slower, and by roughly how much?",
          "source": "Crafting Interpreters part 3",
          "status": "locked"
        }
      ]
    },
    {
      "id": "L5",
      "name": "Operating systems",
      "goal": "Understand the machine the program actually runs inside.",
      "spine": "OSTEP, MIT 6.S081 with xv6, CS:APP chapters 8 and 9, The Linux Programming Interface.",
      "nodes": [
        {
          "id": "L5.1",
          "name": "Kernel mode and user mode",
          "probe": "What can user code not do, and how does it ask?",
          "source": "OSTEP ch2-6",
          "status": "locked"
        },
        {
          "id": "L5.2",
          "name": "System calls",
          "probe": "Read strace output for ls and explain each line.",
          "source": "OSTEP ch4, man strace",
          "status": "locked"
        },
        {
          "id": "L5.3",
          "name": "Processes",
          "probe": "What exactly does fork return in each process, and why?",
          "source": "OSTEP ch5",
          "status": "locked"
        },
        {
          "id": "L5.4",
          "name": "exec and the program image",
          "probe": "What happens to the address space on exec?",
          "source": "OSTEP ch5",
          "status": "locked"
        },
        {
          "id": "L5.5",
          "name": "Threads and scheduling",
          "probe": "What is shared and what is private between threads?",
          "source": "OSTEP ch26-28",
          "status": "locked"
        },
        {
          "id": "L5.6",
          "name": "Virtual memory and page tables",
          "probe": "Walk a virtual address through a four-level table to a physical byte.",
          "source": "CS:APP ch9",
          "status": "locked"
        },
        {
          "id": "L5.7",
          "name": "Page faults, demand paging, copy on write",
          "probe": "Why does fork not copy memory immediately?",
          "source": "CS:APP ch9",
          "status": "locked"
        },
        {
          "id": "L5.8",
          "name": "Files and file descriptors",
          "probe": "What is a file descriptor really, and what does fork do to them?",
          "source": "OSTEP ch39",
          "status": "locked"
        },
        {
          "id": "L5.9",
          "name": "File systems",
          "probe": "Walk a path to an inode. What does fsync guarantee?",
          "source": "OSTEP ch40",
          "status": "locked"
        },
        {
          "id": "L5.10",
          "name": "Interrupts and devices",
          "probe": "How does the CPU learn that a key was pressed?",
          "source": "OSTEP ch36",
          "status": "locked"
        },
        {
          "id": "L5.11",
          "name": "Synchronization",
          "probe": "Build a mutex from an atomic. What is a futex?",
          "source": "OSTEP ch28-31",
          "status": "locked"
        },
        {
          "id": "L5.12",
          "name": "Signals",
          "probe": "Why is a signal handler allowed to do almost nothing?",
          "source": "man signal, Kerrisk ch20-22",
          "status": "locked"
        },
        {
          "id": "L5.13",
          "name": "Namespaces, cgroups, containers",
          "probe": "What makes a container not a virtual machine?",
          "source": "man namespaces, cgroups docs",
          "status": "locked"
        },
        {
          "id": "L5.14",
          "name": "Build an OS",
          "probe": "Make xv6 pass the first lab and explain the trap frame.",
          "source": "MIT 6.S081 labs",
          "status": "locked"
        }
      ]
    },
    {
      "id": "L6",
      "name": "Runtimes",
      "goal": "See what the layer above C does on your behalf, and what it costs.",
      "spine": "Crafting Interpreters, the V8 blog, CPython internals, the Garbage Collection Handbook.",
      "nodes": [
        {
          "id": "L6.1",
          "name": "Tree-walking interpreters",
          "probe": "Where does the time go in a naive interpreter?",
          "source": "Crafting Interpreters part 2",
          "status": "locked"
        },
        {
          "id": "L6.2",
          "name": "Bytecode virtual machines",
          "probe": "Disassemble a Python function and explain the loop.",
          "source": "CPython dis module",
          "status": "locked"
        },
        {
          "id": "L6.3",
          "name": "JIT and tiering",
          "probe": "What does a baseline JIT buy over an interpreter?",
          "source": "V8 blog, Ignition and TurboFan",
          "status": "locked"
        },
        {
          "id": "L6.4",
          "name": "Garbage collection",
          "probe": "Compare mark and sweep, copying, and generational.",
          "source": "The Garbage Collection Handbook",
          "status": "locked"
        },
        {
          "id": "L6.5",
          "name": "Object models",
          "probe": "What are hidden classes, and why do they make property access fast?",
          "source": "V8 blog on shapes",
          "status": "locked"
        },
        {
          "id": "L6.6",
          "name": "Inline caches and deoptimization",
          "probe": "Why does megamorphic code slow down?",
          "source": "V8 blog on inline caches",
          "status": "locked"
        },
        {
          "id": "L6.7",
          "name": "Event loops",
          "probe": "What blocks the Node event loop, and why does it stall timers?",
          "source": "Node docs, the event loop",
          "status": "locked"
        },
        {
          "id": "L6.8",
          "name": "CPython internals",
          "probe": "Read the eval loop and explain one opcode end to end.",
          "source": "CPython Internals by Anthony Shaw",
          "status": "locked"
        },
        {
          "id": "L6.9",
          "name": "V8 internals",
          "probe": "Follow one JavaScript function from Ignition to TurboFan.",
          "source": "V8 blog, docs",
          "status": "locked"
        },
        {
          "id": "L6.10",
          "name": "Foreign function boundaries",
          "probe": "Why must a Python C extension manage reference counts by hand?",
          "source": "CPython C API docs",
          "status": "locked"
        },
        {
          "id": "L6.11",
          "name": "The Go and Rust runtimes",
          "probe": "What does the Go scheduler do that an OS thread does not?",
          "source": "Go runtime docs, Rust nomicon",
          "status": "locked"
        }
      ]
    },
    {
      "id": "L7",
      "name": "Performance",
      "goal": "Reason about time and memory with numbers, not vibes.",
      "spine": "CS:APP ch6, Brendan Gregg's Systems Performance, Agner Fog's manuals.",
      "nodes": [
        {
          "id": "L7.1",
          "name": "The memory hierarchy",
          "probe": "Give rough latencies for register, L1, L2, L3, DRAM, disk, and network.",
          "source": "CS:APP ch6",
          "status": "locked"
        },
        {
          "id": "L7.2",
          "name": "Cache lines and locality",
          "probe": "Why can walking a matrix column first be ten times slower?",
          "source": "CS:APP ch6",
          "status": "locked"
        },
        {
          "id": "L7.3",
          "name": "Cache-friendly layouts",
          "probe": "Convert an array of structs to a struct of arrays and measure.",
          "source": "CS:APP ch6",
          "status": "locked"
        },
        {
          "id": "L7.4",
          "name": "Branch prediction",
          "probe": "Why does sorting an array make a branch faster?",
          "source": "Agner Fog, microarchitecture",
          "status": "locked"
        },
        {
          "id": "L7.5",
          "name": "Pipelining and out-of-order execution",
          "probe": "What is a pipeline stall, and what flushes a pipeline?",
          "source": "Computer Architecture, a Quantitative Approach",
          "status": "locked"
        },
        {
          "id": "L7.6",
          "name": "Profiling with perf",
          "probe": "Find the hottest function in a real program.",
          "source": "perf tutorial, Brendan Gregg",
          "status": "locked"
        },
        {
          "id": "L7.7",
          "name": "Flamegraphs",
          "probe": "Read a flamegraph and find the widest leaf.",
          "source": "Brendan Gregg, flamegraphs",
          "status": "locked"
        },
        {
          "id": "L7.8",
          "name": "Memory profiling",
          "probe": "Find a leak with valgrind or heaptrack.",
          "source": "valgrind docs",
          "status": "locked"
        },
        {
          "id": "L7.9",
          "name": "Locks and contention",
          "probe": "What is false sharing, and how do you see it?",
          "source": "Brendan Gregg, Systems Performance",
          "status": "locked"
        },
        {
          "id": "L7.10",
          "name": "Atomics and memory models",
          "probe": "Why is a relaxed atomic fine for a counter but wrong for a flag?",
          "source": "The C++ memory model, preshing.com",
          "status": "locked"
        },
        {
          "id": "L7.11",
          "name": "Benchmarks that do not lie",
          "probe": "Name three ways a benchmark lies.",
          "source": "Brendan Gregg, Systems Performance ch2",
          "status": "locked"
        },
        {
          "id": "L7.12",
          "name": "SIMD and vectorization",
          "probe": "Why did -O3 vectorize one loop and not the other?",
          "source": "Agner Fog, optimization manuals",
          "status": "locked"
        }
      ]
    },
    {
      "id": "L8",
      "name": "Networks at the syscall level",
      "goal": "Follow a byte from your program to another machine and back.",
      "spine": "Beej's Guide to Network Programming, High Performance Browser Networking, TCP/IP Illustrated.",
      "nodes": [
        {
          "id": "L8.1",
          "name": "Sockets",
          "probe": "Write the minimal TCP client and server with syscalls only.",
          "source": "Beej's Guide to Network Programming",
          "status": "locked"
        },
        {
          "id": "L8.2",
          "name": "TCP",
          "probe": "Walk the handshake and explain what a retransmit does.",
          "source": "TCP/IP Illustrated vol 1",
          "status": "locked"
        },
        {
          "id": "L8.3",
          "name": "Congestion control",
          "probe": "What does the sender do on packet loss?",
          "source": "High Performance Browser Networking ch2",
          "status": "locked"
        },
        {
          "id": "L8.4",
          "name": "DNS",
          "probe": "Trace a lookup with dig and name the record types.",
          "source": "Computer Networking, a Top-Down Approach",
          "status": "locked"
        },
        {
          "id": "L8.5",
          "name": "HTTP on the wire",
          "probe": "What exactly is sent for one request and one response?",
          "source": "High Performance Browser Networking ch4",
          "status": "locked"
        },
        {
          "id": "L8.6",
          "name": "HTTP/2 and HTTP/3",
          "probe": "What problem does multiplexing solve, and why QUIC?",
          "source": "High Performance Browser Networking part 2",
          "status": "locked"
        },
        {
          "id": "L8.7",
          "name": "TLS",
          "probe": "What is verified in a handshake, and what does the session key protect?",
          "source": "Bulletproof SSL and TLS, intro",
          "status": "locked"
        },
        {
          "id": "L8.8",
          "name": "epoll and event-driven servers",
          "probe": "Why can one thread handle ten thousand connections?",
          "source": "man epoll, The Linux Programming Interface ch63",
          "status": "locked"
        },
        {
          "id": "L8.9",
          "name": "Packet capture",
          "probe": "Read a tcpdump of a failed connection and name the failing layer.",
          "source": "tcpdump and wireshark docs",
          "status": "locked"
        },
        {
          "id": "L8.10",
          "name": "Proxies, NAT, load balancers",
          "probe": "What address does the server see as the client?",
          "source": "Computer Networking, a Top-Down Approach",
          "status": "locked"
        },
        {
          "id": "L8.11",
          "name": "How a packet reaches a container",
          "probe": "Trace it through namespaces, the bridge, and NAT rules.",
          "source": "man namespaces, iptables docs",
          "status": "locked"
        }
      ]
    },
    {
      "id": "L9",
      "name": "Real codebases, descended",
      "goal": "The endgame: take any large system and find your way down on demand.",
      "spine": "Pro Git ch10, Chromium design docs, the SQLite file format, Designing Data-Intensive Applications.",
      "nodes": [
        {
          "id": "L9.1",
          "name": "Git internals",
          "probe": "What is a commit object, and what does rebase rewrite?",
          "source": "Pro Git ch10",
          "status": "locked"
        },
        {
          "id": "L9.2",
          "name": "SQLite and B-trees",
          "probe": "How does the page layout make a lookup fast, and what does a write cost?",
          "source": "SQLite file format docs",
          "status": "locked"
        },
        {
          "id": "L9.3",
          "name": "Redis",
          "probe": "How does one thread serve so many clients?",
          "source": "Redis internals docs",
          "status": "locked"
        },
        {
          "id": "L9.4",
          "name": "The Chrome process model",
          "probe": "How many processes for two tabs, and where is the sandbox boundary?",
          "source": "Chromium design docs",
          "status": "locked"
        },
        {
          "id": "L9.5",
          "name": "Blink and V8 at the boundary",
          "probe": "Follow one JavaScript call into the DOM.",
          "source": "Chromium design docs, V8 embedder guide",
          "status": "locked"
        },
        {
          "id": "L9.6",
          "name": "The Linux kernel",
          "probe": "Follow a write syscall from entry to the disk queue.",
          "source": "Linux kernel source, LWN articles",
          "status": "locked"
        },
        {
          "id": "L9.7",
          "name": "LLVM",
          "probe": "Add a new pass and watch it run in the pipeline.",
          "source": "LLVM writing a pass docs",
          "status": "locked"
        },
        {
          "id": "L9.8",
          "name": "Indexes and their cost",
          "probe": "Why does an index make reads fast and writes slower?",
          "source": "Designing Data-Intensive Applications ch3",
          "status": "locked"
        }
      ]
    }
  ]
};

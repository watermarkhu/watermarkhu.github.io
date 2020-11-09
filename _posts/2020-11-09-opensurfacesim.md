---
layout: post
title: "Releasing my package for surface code simulations: opensurfacesim"
date: 2020-11-09
---

A *little* while ago, I started my graduation project in the field of quantum error-correction. During this project, we have successfully developed a new type of decoder for the surface code, for which the publication is currently in pre-print. To fully understand the mechanics of the surface code decoders that eventually led to our decoder, I had built my surface code simulator in Python that allowed for the visualization of each decoding step. To my surprise, my application for a microgrant to the [Unitary Fund](https://unitary.fund) was accepted, which allowed me the continue working for a few months after graduation. Today, I've finished my work and released the simulator on [PyPI](https://pypi.org/project/opensurfacesim/), which means you can install it via `pip install opensurfacesim`! Let me tell you more about it.

<!--more-->

![PyPI screenshot]({{site.url}}/data/2020-11-09-opensurfacesim/pypi.jpg "Look at ma boy!")

## Surface code

The fundamental element of *classical* computation is a bit, which can take on values of 0 and 1. Put multiple bits together, and you can represent more complex information such as numbers, texts, or any other data form. However, any bit of information can be subjected to errors where the original information is changed or lost. For this reason, error-correcting codes are designed to detect and correct these errors. One such *classical* error-correcting code is the **repetition code**, where the same bit is copied to a minimum of 2 other bits. An error is detected if not all repeated bits have the same value, and correction is applied by setting the majority value to all repeated bits. There exists a threshold physical error rate for which the original information cannot be recovered from. For example, if 2 out of 3 repeated bits suffer an error simultaneously, the third correct bit will be corrected in stead.

The fundamental element of **quantum** computation is the quantum bit or **qubit**. The qubit behaves according to quantum-mechanical laws, which allows the qubit to take a value that is in between the 0 and 1 states of the classical bit. This is precisely the analogy of Schrödinger's cat, where the cat is both alive and dead while the box is closed. The *superposition* gives qubits leverage over classical bits in certain types of computations. However, the same laws that allow for this leverage also have limitations. For example, we cannot simply copy a qubit's state to other qubits for the repetition code per the [no cloning theorem](https://en.wikipedia.org/wiki/No-cloning_theorem). After all, we cannot copy a box with either a dead or alive cat without looking into it. But if we do, the cat is not *alive and dead* anymore but *alive* or *dead*.

The design of a *quantum* error-correcting code is thus fundamentally different from its classical counterpart. Even though we cannot copy one qubit's information to another, what we can do is to *spread* the information of one qubit (the logical qubit) over numerous other (physical) qubits. One such quantum error-correcting code is the **surface code**, where the physical qubits are laid out on a two-dimensional lattice. About half the physical qubits carry the logical state which we wish the preserve, and the other half is used to carry out *parity measurements* that will give an indication when an error occurs. It is up to the decoder to find out from this indication which physical errors have occurred. [More on surface codes.](https://arxiv.org/abs/quant-ph/0110143)

![Google's Sycamore quantum processor](https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Sycamore-Rainbow-cropped.max-1000x1000.jpg "Google's Sycamore processor with which Google had (controversially) achieved quantum supremacy used the surface code for quantum error correction.")

## opensurfacesim

Initially, the simulator's focus was to visualize each step of the decoding process of the [*Union-Find*](https://arxiv.org/pdf/1709.06218.pdf) decoder. This is a relatively new decoder that offers relatively fast decoding at the cost of slightly decreased fidelity compared to the standard [*Minimum-Weight Perfect Matching* (MWPM)](https://arxiv.org/abs/quant-ph/0110143) decoder. I was determined that the fidelity could be improved. By studying the decoding process using the simulator, we developed a modification that is now dubbed the *Union-Find Node-Suspension* decoder. You can read more about decoders in my [thesis](https://www.researchgate.net/publication/344163215_Quasilinear_Time_Decoding_Algorithm_for_Topological_Codes_with_High_Error_Threshold) or in the paper (link updated when published).

After receiving the grant, I realized that the simulator's modularity is a prime objective and started working on restructuring and rewriting the codebase. As of today, *opensurfacesim* is designed to modularize three core aspects of a surface code simulation:

1. The surface code
2. The error model
3. The used decoder

For each core module, template classes are provided that should ease the development of new types of surface codes, error modules and decoders. But the most popular types of the core modules are already included. For example, to simulate the *toric* surface code and simulate with *bitflip* error for 10 iterations and decode with the *MWPM* decoder:

```python
>>> from opensurfacesim.main import initialize, run
>>> code, decoder = initialize((6,6), "toric", "mwpm", enabled_errors=["pauli"])
>>> run(code, decoder, iterations=10, error_rates = {"p_bitflip": 0.1})
{'no_error': 8}
```

Visualization of the code and decoding process is still one of *opensurfacesim*'s prime objective. A template plotting module is provided that allows for interactive plotting and moving backward and forward in history to show past instances of the figure. The surface code figure uses this template, and an example is shown below.

```python
>>> code, decoder = initialize(
...    (3,3),
...    "toric",
...    "mwpm",
...    enabled_errors=["pauli"],
...    faulty_measurements=True,
...    plotting=True,
...    initial_states=(0,0)
... )
>>> run(code,
...     decoder,
...     error_rates={"p_bitflip": 0.05, "p_bitflip_plaq": 0.05},
...     decode_initial=False
... )
```

![Interactive plotting on a toric code with faulty measurements.](https://raw.githubusercontent.com/watermarkhu/OpenSurfaceSim/master/images/toric-3d.gif "Now this doesn't look that good on a dark background :(")

You can find more information on installing the package, the requirements, and more examples on the [GitHub repository](https://github.com/watermarkhu/opensurfacesim). More information on how to use the package can be found in the [documentation](https://opensurfacesim.readthedocs.io).

---

A lot of the codebase has changed from the version that I used for my thesis. The version at the time worked fine but wasn't structured nicely and not at all well documented enough to be used by any individual than myself (and the poor master student that succeeded me, probably). The folks at Unitary Fund have shown me the required steps for developing an open-source scientific library. I've learned the benefits of testing and continuous integration, the tools for automatic documentation generation, and how to distribute and publish my package. I've followed the steps [outlined here](https://github.com/nathanshammah/scikit-project) by Nathan Shammah from the Unitary Fund. Even though some tools listed can be updated (Many prefer to use VSCode as the IDE for its versatility, extensions, and debugging modes, and I personally prefer GitHub Actions for CI due to its direct integration in GitHub), it has been a great stepping stone in developing *opensurfacesim, a simulator and visualizer for surface code and decoding the surface code*.

# GSoC Proposal Reviewer 📝

[![Docker Image CI](https://github.com/ikartiksh/gsoc-proposal-reviewer/actions/workflows/docker-image.yml/badge.svg)](https://github.com/ikartiksh/gsoc-proposal-reviewer/actions/workflows/docker-image.yml)
[![Docker Pull Command](https://img.shields.io/badge/docker-pull-blue?logo=docker)](https://github.com/ikartiksh/gsoc-proposal-reviewer/pkgs/container/gsoc-proposal-reviewer)

An intelligent web application designed to analyze and provide detailed feedback on Google Summer of Code (GSoC) proposals. This tool leverages the Cerebras API with Llama models to evaluate proposals based on key metrics, identify strengths and weaknesses, and offer constructive advice. The entire application is containerized with Docker for easy deployment and use.



---
## Key Features ✨

* **PDF Proposal Upload:** Easily upload GSoC proposals in PDF format.
* **AI-Powered Metrics Analysis:** Get scores on crucial metrics like 
**Technical Depth**, **Project Understanding**, and **Timeline Clarity**.
* **Strengths & Weaknesses:** The AI identifies the top three strengths and areas for improvement in the proposal.
* **Timeline Extraction:** Automatically extracts the proposed project timeline from the document.
* **Detailed Constructive Feedback:** Generates a comprehensive, prose-based review to help applicants improve their proposals.
* **Containerized & Portable:** Packaged with Docker for a seamless setup on any machine.

---
## 🚀 How to Run (Recommended)

This project is distributed as a Docker container. You can run it on any machine with Docker installed without needing to set up a development environment.

### 1. Pull the Docker Image

Pull the latest image from the GitHub Container Registry:
```bash
docker pull ghcr.io/ikartiksh/gsoc-proposal-reviewer:latest
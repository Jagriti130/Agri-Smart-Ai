const BACKEND_BASE = window.location.protocol.startsWith('http')
  ? window.location.origin
  : 'http://127.0.0.1:5000';
const statusEl = document.getElementById('backend-status');
const uploadButton = document.getElementById('upload-btn');

function showTab(index) {
  const tabs = document.querySelectorAll('.tab-btn');
  const contents = document.querySelectorAll('.tab-content');

  tabs.forEach((tab, i) => tab.classList.toggle('active', i === index));
  contents.forEach((content, i) => {
    content.style.display = i === index ? 'block' : 'none';
  });
}

async function updateBackendStatus() {
  if (!statusEl) return;

  try {
    const response = await fetch(`${BACKEND_BASE}/health`);
    if (!response.ok) throw new Error('Health check failed');

    statusEl.textContent = 'Backend connected ✓';
    statusEl.classList.remove('error');
    if (uploadButton) uploadButton.disabled = false;
  } catch (err) {
    statusEl.textContent = 'Backend unavailable - कृपया सर्वर चलाएँ';
    statusEl.classList.add('error');
    if (uploadButton) uploadButton.disabled = true;
  }
}

async function uploadImage() {
  const fileInput = document.getElementById('image-upload');
  const file = fileInput.files[0];

  if (!file) {
    alert('कृपया फोटो चुनें');
    return;
  }

  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await fetch(`${BACKEND_BASE}/analyze`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      alert(error.error || 'Backend analysis failed');
      return;
    }

    const data = await response.json();
    const query = new URLSearchParams({
      disease: data.disease || 'Unknown',
      crop: data.crop || 'Unknown',
      confidence: String(data.confidence || 'N/A'),
      advice: data.advice || 'कोई सलाह उपलब्ध नहीं है।',
      imageUrl: data.imageUrl || '',
    });

    window.location.href = `results.html?${query.toString()}`;
  } catch (error) {
    alert('Error connecting to backend. Is backend running?');
    if (statusEl) {
      statusEl.textContent = 'Backend unavailable - कृपया सर्वर चलाएँ';
      statusEl.classList.add('error');
    }
  }
}

const fileInput = document.getElementById('image-upload');
const previewCard = document.getElementById('preview-card');
const previewImg = document.getElementById('preview-img');
const previewText = document.getElementById('preview-text');

function showPreview(file) {
  if (!previewCard || !previewImg || !previewText) return;
  previewImg.src = URL.createObjectURL(file);
  previewImg.alt = file.name;
  previewText.textContent = `${file.name} • ${(file.size / 1024).toFixed(1)} KB`;
  previewCard.style.display = 'grid';
}

function clearPreview() {
  if (!previewCard || !previewImg || !previewText) return;
  previewImg.src = '';
  previewImg.alt = '';
  previewText.textContent = '';
  previewCard.style.display = 'none';
}

if (fileInput) {
  fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      showPreview(file);
    } else {
      clearPreview();
    }
  });
}

const recordBtn = document.getElementById('record-btn');
const voiceStatus = document.getElementById('voice-status');

if (recordBtn && voiceStatus) {
  let isRecording = false;

  recordBtn.addEventListener('click', () => {
    isRecording = !isRecording;

    if (isRecording) {
      recordBtn.style.background = '#ef4444';
      recordBtn.innerHTML = '<i class="fas fa-stop"></i>';
      voiceStatus.textContent = 'बोल रहे हैं...';
    } else {
      recordBtn.style.background = '#166534';
      recordBtn.innerHTML = '<i class="fas fa-microphone"></i>';
      voiceStatus.textContent = 'विश्लेषण हो रहा है...';

      setTimeout(() => {
        window.location.href = 'results.html?disease=Leaf_Blast&crop=Paddy&confidence=0.88&advice=' + encodeURIComponent('पत्तियों में पीली धारियाँ दिख रही हैं। प्रभावित हिस्से काटें और उचित कीटनाशक का उपयोग करें।');
      }, 1500);
    }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  showTab(0);
  updateBackendStatus();
});